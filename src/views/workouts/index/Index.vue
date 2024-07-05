<template>
  <Form class="p-4">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots>
        <DropdownMenuContent align="end">
          <DropdownMenuItem :disabled="selectedIndex == null" @click="select(selectedIndex)">
            Select at interval
          </DropdownMenuItem>
          <DropdownMenuItem @click="router.push({ path: '/workouts/new', query: { type, index } })">
            Duplicate
          </DropdownMenuItem>
          <template v-if="type === 'custom'">
            <DropdownMenuItem @click="router.push({ path: `/workouts/${type}/${index}/edit` })">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem @click="remove">Delete</DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </Dots>
    </div>

    <Header :workout="workout" />

    <Chart class="shrink-0 border aspect-[5/2]">
      <ChartLines />
      <ChartIntervals
        :intervals="workout.intervals"
        :selected-index="selectedIndex"
        @update:selected-index="
          selectedIndex = $event;
          $refs.table.scrollTo($event);
        "
      />
    </Chart>

    <FormItem class="flex-1">
      <Label>Intervals</Label>
      <Intervals
        ref="table"
        class="flex-1"
        :items="workout.intervals"
        v-model:selected-index="selectedIndex"
      />
    </FormItem>

    <Button @click="select(0)">Select</Button>
  </Form>
</template>

<script setup>
import Back from '@/components/Back.vue';
import Dots from '@/components/Dots.vue';
import Intervals from '@/components/Intervals.vue';
import Chart from '@/components/chart/Chart.vue';
import ChartIntervals from '@/components/chart/ChartIntervals.vue';
import ChartLines from '@/components/chart/ChartLines.vue';
import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Form, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Activity } from '@/modules/activity';
import { Workout } from '@/modules/workout';
import { useActivityStore } from '@/stores/activity';
import { useWorkoutsStore } from '@/stores/workouts';
import { dialog } from '@/utils/dialog';
import Header from '@/views/workouts/Header.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  index: { type: Number, required: true },
  type: { type: String, required: true },
});

const router = useRouter();
const selectedIndex = ref(null);

const workout = computed(() => {
  const { workouts } = useWorkoutsStore();
  return workouts(props.type)[props.index] ?? new Workout();
});

const select = async (index) => {
  const store = useActivityStore();
  if (store.activity != null && store.activity.seconds > 0) {
    const index = await dialog({
      content: 'Do you want to save the current activity?',
      buttons: [
        { text: 'Yes' },
        { text: 'No', variant: 'secondary' },
        { text: 'Cancel', variant: 'secondary' },
      ],
    });
    switch (index) {
      case 0:
        store.finish();
        break;
      case 1:
        break;
      default:
        return;
    }
  }
  store.activity = new Activity(
    new Workout(workout.value.name, workout.value.intervals.slice(index)),
  );
  router.push('/train');
};

const remove = async () => {
  const index = await dialog({
    content: 'Do you want to delete this workout?',
    buttons: [{ text: 'Delete' }, { text: 'Cancel', variant: 'secondary' }],
  });
  if (index === 0) {
    const store = useWorkoutsStore();
    store.remove(props.index);
    router.back();
  }
};
</script>
