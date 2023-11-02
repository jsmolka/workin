<template>
  <div class="flex flex-col gap-4">
    <div v-for="workout in workouts" class="bg-gray-6 flex gap-4 p-4">
      <Intervals class="shrink-0 h-24 bg-gray-7 aspect-[2/1]" :intervals="workout.intervals" />
      <div class="flex flex-col justify-between overflow-hidden">
        <div class="truncate font-bold text-gray-1 text-lg">
          {{ workout.name }}
        </div>
        <div class="truncate">VO2 max</div>
        <div class="truncate">{{ new Time(4, 30).format('h:mm:ss') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Intervals from '../../components/Intervals.vue';
import { Interval } from '../../modules/interval';
import { Time } from '../../modules/time';
import { Workout } from '../../modules/workout';

const workout = new Workout('1 x 30 x 30');
workout.intervals.push(new Interval(300, 0.5));
workout.intervals.push(new Interval(300, 0.75));
workout.intervals.push(new Interval(300, 1));
workout.intervals.push(new Interval(300, 0.5));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(300, 0.5));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(300, 0.5));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.5));
workout.intervals.push(new Interval(300, 0.5));

const workouts = [
  workout,
  workout,
  workout,
  workout,
  workout,
  workout,
  workout,
  workout,
  workout,
  workout,
  workout,
  workout,
];
</script>
