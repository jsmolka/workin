<template>
  <Form class="h-full">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots>
        <MenuItem>
          <Button :class="{ disabled: selection == null }" @click="select(selection)">
            Select at interval
          </Button>
        </MenuItem>
        <MenuItem v-if="type === 'custom'">
          <Button @click="remove">Delete</Button>
        </MenuItem>
      </Dots>
    </div>
    <Header :workout="workout" />
    <Chart class="border border-gray-7 shrink-0 aspect-[5/2]">
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
    <Button @click="select(0)" blue>Select</Button>
  </Form>
</template>

<script setup>
import { MenuItem } from '@headlessui/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Back from '../../../components/Back.vue';
import Button from '../../../components/Button.vue';
import Dots from '../../../components/Dots.vue';
import Form from '../../../components/Form.vue';
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
    const value = await dialog('Do you want to save the current activity?', [
      { text: 'Cancel', value: 'cancel' },
      { text: 'No', value: 'no' },
      { text: 'Yes', value: 'yes', blue: true },
    ]);
    switch (value) {
      case 'yes':
        store.finish();
        break;
      case 'no':
        break;
      default:
        return;
    }
  }
  store.activity = new Activity(new Workout(workout.name, workout.intervals.slice(index)));
  router.push('/train');
};

const remove = async () => {
  const value = await dialog('Do you want to delete this workout?', [
    { text: 'Cancel', value: 'cancel' },
    { text: 'Delete', value: 'delete', blue: true },
  ]);
  if (value === 'delete') {
    router.back();
    store.remove(props.index);
  }
};
</script>
