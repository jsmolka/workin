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
          <DropdownMenuItem :disabled="selectedIndex == null" @click="edit">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem :disabled="selectedIndex == null" @click="duplicate">
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem :disabled="selectedIndex == null" @click="remove">
            Delete
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
        :sortable="true"
        v-model:selected-index="selectedIndex"
      />
      <EditIntervalDialog v-model:open="open" :interval="workout.intervals[selectedIndex]" />
    </FormItem>

    <div class="flex gap-4">
      <FormItem class="flex-1 min-w-0">
        <Label>Duration</Label>
        <InputIntervalSeconds v-model="seconds" />
      </FormItem>

      <FormItem class="flex-1 min-w-0">
        <Label>Intensity</Label>
        <InputIntervalIntensity v-model="intensity" />
      </FormItem>

      <div class="flex items-end">
        <Button variant="secondary" :disabled="seconds == null" @click="add">Add</Button>
      </div>
    </div>
    <Button
      :disabled="workout.name.length === 0 || workout.intervals.length === 0"
      @click="emit('save', workout)"
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Interval, cooldown, warmup } from '@/modules/interval';
import { Workout } from '@/modules/workout';
import { clone } from '@/utils/persist';
import EditIntervalDialog from '@/views/workouts/EditIntervalDialog.vue';
import InputIntervalIntensity from '@/views/workouts/InputIntervalIntensity.vue';
import InputIntervalSeconds from '@/views/workouts/InputIntervalSeconds.vue';
import { reactive, ref } from 'vue';

const open = ref(false);

const props = defineProps({
  workout: { type: Workout, required: true },
});

const emit = defineEmits(['save']);

const workout = reactive(clone(props.workout));

const selectedIndex = ref(null);

const seconds = ref(300);
const intensity = ref(0.5);

const add = () => {
  workout.intervals.push(new Interval(seconds.value, intensity.value));
};

const edit = () => {
  open.value = true;
};

const duplicate = () => {
  workout.intervals.splice(selectedIndex.value, 0, clone(workout.intervals[selectedIndex.value]));
  selectedIndex.value++;
};

const remove = () => {
  const intervals = workout.intervals;
  intervals.splice(selectedIndex.value, 1);
  if (intervals.length > 0) {
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else {
    selectedIndex.value = null;
  }
};
</script>
