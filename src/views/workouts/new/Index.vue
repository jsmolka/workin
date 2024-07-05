<template>
  <Form class="p-4">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="workout.intervals.push(...warmup)">Add warmup</DropdownMenuItem>
          <DropdownMenuItem @click="workout.intervals.push(...cooldown)">
            Add cooldown
          </DropdownMenuItem>
          <DropdownMenuItem :disabled="selectedIndex == null" @click="deleteInterval">
            Delete interval
          </DropdownMenuItem>
        </DropdownMenuContent>
      </Dots>
    </div>

    <FormItem>
      <Label>Name</Label>
      <Input v-model="workout.name" />
    </FormItem>

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

    <div class="flex gap-4">
      <FormItem class="flex-1 min-w-0">
        <Label>Duration</Label>
        <Input
          v-model="durationInput"
          v-maska
          data-maska="['#:##', '##:##', '#:##:##', '##:##:##']"
          type="text"
          inputmode="numeric"
        />
      </FormItem>

      <FormItem class="flex-1 min-w-0">
        <Label>Intensity</Label>
        <InputNumber :min="0" :max="1000" suffix=" % FTP" v-model="intensityInput" />
      </FormItem>

      <div class="flex items-end">
        <Button
          variant="secondary"
          :disabled="duration == null || intensity == null"
          @click="addInterval"
        >
          Add
        </Button>
      </div>
    </div>
    <Button
      :disabled="workout.name.length === 0 || workout.intervals.length === 0"
      @click="saveWorkout"
    >
      Save
    </Button>
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
import { Input, InputNumber } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Interval, cooldown, warmup } from '@/modules/interval';
import { Workout } from '@/modules/workout';
import { useWorkoutsStore } from '@/stores/workouts';
import { clone } from '@/utils/persist';
import { parseSeconds } from '@/utils/time';
import { vMaska } from 'maska/vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const parseQueryWorkout = () => {
  if (!['standard', 'custom'].includes(route.query.type) || route.query.index == null) {
    return null;
  }
  const { workouts } = useWorkoutsStore();
  const workout = workouts(route.query.type)[parseInt(route.query.index) || 0];
  return workout ? clone(workout) : null;
};

const router = useRouter();
const selectedIndex = ref(null);
const workout = ref(parseQueryWorkout() ?? new Workout('New workout'));

const durationInput = ref('5:00');
const duration = computed(() => {
  if (durationInput.value == null) {
    return null;
  }
  return parseSeconds(durationInput.value);
});

const intensityInput = ref(50);
const intensity = computed(() => {
  if (intensityInput.value == null) {
    return null;
  }
  return intensityInput.value / 100;
});

const addInterval = () => {
  workout.value.intervals.splice(
    selectedIndex.value != null ? selectedIndex.value : workout.value.intervals.length,
    0,
    new Interval(duration.value, intensity.value),
  );
};

const deleteInterval = () => {
  const intervals = workout.value.intervals;
  intervals.splice(selectedIndex.value, 1);
  if (intervals.length > 0) {
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else {
    selectedIndex.value = null;
  }
};

const saveWorkout = () => {
  const store = useWorkoutsStore();
  const index = store.add(workout.value);
  router.replace(`/workouts/custom/${index}`);
};
</script>
