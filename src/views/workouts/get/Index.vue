<template>
  <Form class="h-full">
    <Header :workout="workout" />
    <Chart class="aspect-[3/1]">
      <ChartLines />
      <ChartIntervals
        :intervals="workout.intervals"
        :selection="selection"
        @update:selection="
          selection = $event;
          table.scrollTo($event);
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
    <div class="flex gap-4">
      <Button class="flex-1" @click="router.go(-1)">Back</Button>
      <Button class="flex-1" @click="select" blue>Select</Button>
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

const workout = computed(() => store.workouts(props.type)[props.index]);

const table = ref();
const selection = ref(null);

const select = () => {
  if (activity.value?.seconds > 0) {
    activities.value.push(activity.value);
  }
  activity.value = new Activity(workout.value);
  router.push('/train');
};
</script>
