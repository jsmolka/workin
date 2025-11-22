<template>
  <Form class="p-4">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="exportPng">Export PNG</DropdownMenuItem>
          <DropdownMenuItem @click="remove">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </Dots>
    </div>

    <Header :activity="activity" />

    <Chart class="aspect-5/2 shrink-0 border">
      <ChartLines />
      <ChartLaps
        :laps="activity.laps"
        :selected-index="selectedIndex"
        @update:selected-index="
          selectedIndex = $event;
          $refs.table.scrollTo($event);
        "
      />
      <ChartHeartRate class="pointer-events-none" :polylines="activity.polylinesHeartRate" />
      <ChartPower class="pointer-events-none" :polylines="activity.polylinesPower" />
    </Chart>

    <FormItem class="flex-1">
      <Label>Laps</Label>
      <Laps
        ref="table"
        class="flex-1"
        :items="activity.laps"
        v-model:selected-index="selectedIndex"
      />
    </FormItem>

    <Button @click="exportFit">Export FIT</Button>
  </Form>
</template>

<script setup>
import Back from '@/components/Back.vue';
import { Chart, ChartHeartRate, ChartLaps, ChartLines, ChartPower } from '@/components/chart';
import Dots from '@/components/Dots.vue';
import Laps from '@/components/Laps.vue';
import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Form, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Activity } from '@/modules/activity';
import { useActivitiesStore } from '@/stores/activities';
import { dialog } from '@/utils/dialog';
import { download } from '@/utils/filesystem';
import { formatDate } from '@/utils/time';
import Header from '@/views/activities/Header.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  index: { type: Number, required: true },
});

const router = useRouter();
const selectedIndex = ref(null);

const activity = computed(() => {
  const { activities } = useActivitiesStore();
  return activities[props.index] ?? new Activity();
});

const filename = (extension) => {
  return `${formatDate(activity.value.date, 'YYMMDD_HHmmss')} - ${activity.value.workout.name}.${extension}`;
};

const exportFit = () => {
  download(activity.value.toFit(), filename('fit'), 'application/vnd.ant.fit');
};

const exportPng = () => {
  const link = document.createElement('a');
  link.href = activity.value.toCanvas().toDataURL('image/png');
  link.download = filename('png');
  link.click();
};

const remove = async () => {
  const index = await dialog({
    content: 'Do you want to delete this activity?',
    buttons: [{ text: 'Delete' }, { text: 'Cancel', variant: 'secondary' }],
  });
  if (index === 0) {
    const store = useActivitiesStore();
    store.remove(props.index);
    router.back();
  }
};
</script>
