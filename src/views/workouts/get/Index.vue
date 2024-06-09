<template>
  <Form class="h-full">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots>
        <DropdownMenuContent align="end">
          <DropdownMenuItem :disabled="selection == null" @click="select(selection)">
            Select at interval
          </DropdownMenuItem>
          <DropdownMenuItem v-if="type === 'custom'" @click="remove">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </Dots>
    </div>
    <Header :workout="workout" />
    <Chart class="shrink-0 border border-shade-7 aspect-[5/2]">
      <ChartLines />
      <ChartIntervals
        :intervals="workout.intervals"
        :selection="selection"
        @update:selection="
          selection = $event;
          $refs.table.scrollTo($event);
        "
      />
    </Chart>
    <Label class="flex-1" text="Intervals">
      <Intervals
        ref="table"
        class="flex-1"
        :intervals="workout.intervals"
        v-model:selection="selection"
      />
    </Label>
    <Button @click="select(0)">Select</Button>
  </Form>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Form } from '@/components/ui/form';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Back from '../../../components/Back.vue';
import Dots from '../../../components/Dots.vue';
import Intervals from '../../../components/Intervals.vue';
import Label from '../../../components/Label.vue';
import Chart from '../../../components/chart/Chart.vue';
import ChartIntervals from '../../../components/chart/ChartIntervals.vue';
import ChartLines from '../../../components/chart/ChartLines.vue';
import { Activity } from '../../../modules/activity';
import { Workout } from '../../../modules/workout';
import { useActivityStore } from '../../../stores/activity';
import { useWorkoutsStore } from '../../../stores/workouts';
import { dialog } from '../../../utils/dialog';
import Header from '../Header.vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const store = useWorkoutsStore();

const selection = ref(null);
const workout = store.workouts(props.type)[props.index];

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
  store.activity = new Activity(new Workout(workout.name, workout.intervals.slice(index)));
  router.push('/train');
};

const remove = async () => {
  const index = await dialog({
    content: 'Do you want to delete this workout?',
    buttons: [{ text: 'Delete' }, { text: 'Cancel', variant: 'secondary' }],
  });
  if (index === 0) {
    router.back();
    store.remove(props.index);
  }
};
</script>
