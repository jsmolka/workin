<template>
  <div class="flex flex-col gap-4">
    <WorkoutComponent v-for="workout in workouts" :workout="workout" />
  </div>
</template>

<script setup>
import { Interval } from '../../modules/interval';
import { Workout } from '../../modules/workout';
import WorkoutComponent from './Workout.vue';

const w1 = new Workout('Simple');
w1.intervals.push(new Interval(60 * 60, 1));

const workout = new Workout('1 x 30 x 30');
workout.intervals.push(new Interval(300, 0.5));
workout.intervals.push(new Interval(300, 0.75));
workout.intervals.push(new Interval(300, 1));
workout.intervals.push(new Interval(300, 0.5));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(300, 0.5));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(300, 0.5));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(30, 1.0));
workout.intervals.push(new Interval(30, 1.3));
workout.intervals.push(new Interval(300, 0.5));

const workouts = [
  w1,
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
