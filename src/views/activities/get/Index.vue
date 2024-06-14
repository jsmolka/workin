<template>
  <Form class="p-4">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="exportGraphic">Export graphic</DropdownMenuItem>
          <DropdownMenuItem @click="remove">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </Dots>
    </div>
    <Header :activity="activity" />
    <Chart class="shrink-0 border aspect-[5/2]">
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
    <Button @click="exportTcx">Export TCX</Button>
  </Form>
</template>

<script setup>
import Back from '@/components/Back.vue';
import Dots from '@/components/Dots.vue';
import Laps from '@/components/Laps.vue';
import Chart from '@/components/chart/Chart.vue';
import ChartHeartRate from '@/components/chart/ChartHeartRate.vue';
import ChartLaps from '@/components/chart/ChartLaps.vue';
import ChartLines from '@/components/chart/ChartLines.vue';
import ChartPower from '@/components/chart/ChartPower.vue';
import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Form, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useActivitiesStore } from '@/stores/activities';
import { dialog } from '@/utils/dialog';
import { download } from '@/utils/filesystem';
import { powerToSpeed } from '@/utils/speed';
import { formatDate } from '@/utils/time';
import Header from '@/views/activities/Header.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  index: { type: Number, required: true },
});

const selectedIndex = ref(null);
const activity = computed(() => {
  const { activities } = useActivitiesStore();
  return activities[props.index];
});
const filename = computed(() => {
  return `${formatDate(activity.value.date, 'YYMMDD')} - ${activity.value.workout.name}`;
});

const exportTcx = () => {
  download(
    activity.value.toTcx((power) => powerToSpeed(power)),
    `${filename}.tcx`,
    'application/vnd.garmin.tcx+xml',
  );
};

const exportGraphic = () => {
  const link = document.createElement('a');
  link.href = activity.value.toCanvas().toDataURL('image/png');
  link.download = `${filename}.png`;
  link.click();
};

const remove = async () => {
  const index = await dialog({
    content: 'Do you want to delete this activity?',
    buttons: [{ text: 'Delete' }, { text: 'Cancel', variant: 'secondary' }],
  });
  if (index !== 0) {
    return;
  }

  const router = useRouter();
  const { remove } = useActivitiesStore();
  router.back();
  remove(props.index);
};
</script>
