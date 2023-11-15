<template>
  <Form class="h-full">
    <Back />
    <Label text="Name">
      <Input v-model:value="workout.name" placeholder="Workout name" />
    </Label>
    <Chart class="aspect-[3/1]">
      <ChartLines />
      <ChartIntervals :intervals="workout.intervals" />
    </Chart>
    <Label class="flex-1" text="Intervals">
      <Intervals class="flex-1" :intervals="workout.intervals" />
    </Label>
    <div class="flex gap-4">
      <Label class="flex-1 min-w-0" text="Duration">
        <Input v-model:value="durationValue" placeholder="15:00" />
      </Label>
      <Label class="flex-1 min-w-0" text="Intensity [% FTP]">
        <InputNumber :min="0" v-model:value="intensityValue" placeholder="50" />
      </Label>
      <div class="flex items-end">
        <Button :disabled="duration == null || intensity == null" @click="add">Add</Button>
      </div>
    </div>
    <Button
      :disabled="workout.name.length === 0 || workout.intervals.length === 0"
      @click="save"
      blue
    >
      Save
    </Button>
  </Form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Back from '../../../components/Back.vue';
import Button from '../../../components/Button.vue';
import Form from '../../../components/Form.vue';
import Input from '../../../components/Input.vue';
import InputNumber from '../../../components/InputNumber.vue';
import Intervals from '../../../components/Intervals.vue';
import Label from '../../../components/Label.vue';
import Chart from '../../../components/chart/Chart.vue';
import ChartIntervals from '../../../components/chart/ChartIntervals.vue';
import ChartLines from '../../../components/chart/ChartLines.vue';
import { Interval } from '../../../modules/interval';
import { Workout } from '../../../modules/workout';
import { useWorkoutsStore } from '../../../stores/workouts';

const durationValue = ref(null);
const duration = computed(() => {
  if (durationValue.value == null) {
    return null;
  }

  const units = durationValue.value.split(':');
  if (units.length === 0) {
    return null;
  }

  units.reverse();

  let seconds = 0;
  if (units.length > 0) {
    const value = parseInt(units[0]);
    if (isNaN(value) || value < 0 || value >= 60) {
      return null;
    }
    seconds += value;
  }
  if (units.length > 1) {
    const value = parseInt(units[1]);
    if (isNaN(value) || value < 0 || value >= 60) {
      return null;
    }
    seconds += value * 60;
  }
  if (units.length > 2) {
    const value = parseInt(units[2]);
    if (isNaN(value) || value < 0 || value >= 24) {
      return null;
    }
    seconds += value * 60 * 60;
  }
  return seconds;
});

const intensityValue = ref(null);
const intensity = computed(() => {
  if (intensityValue.value == null) {
    return null;
  }
  return intensityValue.value / 100;
});

const workout = reactive(new Workout());

const add = () => {
  workout.intervals.push(new Interval(duration.value, intensity.value));
};

const router = useRouter();
const { custom } = storeToRefs(useWorkoutsStore());

const save = () => {
  custom.value.push(workout);

  router.push(`/workouts/custom/${custom.value.length - 1}`);
};
</script>
