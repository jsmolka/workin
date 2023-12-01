<template>
  <Form class="h-full">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots v-if="type === 'custom'">
        <MenuItem>
          <Button @click="remove">Delete</Button>
        </MenuItem>
      </Dots>
    </div>
    <Header :workout="workout" />
    <Chart class="aspect-[5/2]">
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
    <Button @click="select" blue>Select</Button>
  </Form>
</template>

<script setup>
import { MenuItem } from '@headlessui/vue';
import { storeToRefs } from 'pinia';
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
import { useActivitiesStore } from '../../../stores/activities';
import { useActivityStore } from '../../../stores/activity';
import { useWorkoutsStore } from '../../../stores/workouts';
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
const { activity } = storeToRefs(useActivityStore());
const { activities } = storeToRefs(useActivitiesStore());
const store = useWorkoutsStore();

const selection = ref(null);
const workout = store.workouts(props.type)[props.index];

const remove = () => {
  router.back();
  store.custom.splice(props.index, 1);
};

const select = () => {
  if (activity.value != null && activity.value.seconds > 0) {
    activities.value.push(activity.value);
  }
  activity.value = new Activity(workout);
  router.push('/train');
};
</script>
