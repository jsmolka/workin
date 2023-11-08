<template>
  <Form class="h-full">
    <div class="flex flex-col">
      <span class="truncate text-gray-1 text-lg font-bold">{{ workout.name }}</span>
      <span class="truncate">{{ workout.zone.name }}</span>
    </div>
    <WorkoutDetails :workout="workout" />
    <Chart class="aspect-[3/1]">
      <ChartLines />
      <ChartIntervals
        :intervals="workout.intervals"
        :selection="selection"
        @update:selection="
          selection = $event;
          intervals.scrollTo($event);
        "
      />
    </Chart>
    <Label class="flex-1" text="Intervals">
      <Intervals
        ref="intervals"
        class="flex-1"
        :intervals="workout.intervals"
        v-model:selection="selection"
        clickable
      />
    </Label>
    <div class="flex gap-4">
      <Button class="flex-1" @click="router.push({ name: 'workouts' })">Back</Button>
      <Button class="flex-1" blue @click="select">Select</Button>
    </div>
  </Form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../../../components/Button.vue';
import Form from '../../../components/Form.vue';
import Intervals from '../../../components/Intervals.vue';
import Label from '../../../components/Label.vue';
import Chart from '../../../components/chart/Chart.vue';
import ChartIntervals from '../../../components/chart/ChartIntervals.vue';
import ChartLines from '../../../components/chart/ChartLines.vue';
import { Activity } from '../../../modules/activity';
import { useActivityStore } from '../../../stores/activity';
import { useWorkoutsStore } from '../../../stores/workouts';
import WorkoutDetails from '../WorkoutDetails.vue';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const { workouts } = storeToRefs(useWorkoutsStore());

const workout = computed(() => workouts.value[props.index]);

const intervals = ref();
const selection = ref(null);

const select = () => {
  const store = useActivityStore();
  store.setActivity(new Activity(workout.value));
  router.push({ name: 'train' });
};
</script>
