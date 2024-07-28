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
          <DropdownMenuItem :disabled="selectedInterval == null" @click="edit">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem :disabled="selectedInterval == null" @click="duplicate">
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem :disabled="selectedInterval == null" @click="remove">
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
      <EditIntervalDialog v-model:open="editDialogOpen" :interval="selectedInterval" />
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
        <Button variant="secondary" :disabled="isAddDisabled" @click="add">Add</Button>
      </div>
    </div>
    <Button :disabled="isSaveDisabled" @click="emit('save', workout)">Save</Button>
  </Form>
</template>

<script setup>
import Back from '@/components/Back.vue';
import { Chart, ChartIntervals, ChartLines } from '@/components/chart';
import Dots from '@/components/Dots.vue';
import Intervals from '@/components/Intervals.vue';
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
import { computed, reactive, ref } from 'vue';

const props = defineProps({
  workout: { type: Workout, required: true },
});

const emit = defineEmits(['save']);

const workout = computed(() => {
  return reactive(clone(props.workout));
});

const seconds = ref(300);
const intensity = ref(0.5);

const selectedIndex = ref(null);
const selectedInterval = computed(() => {
  return selectedIndex.value != null ? workout.value.intervals[selectedIndex.value] : null;
});

const isAddDisabled = computed(() => {
  return seconds.value == null || intensity.value == null;
});

const add = () => {
  workout.value.intervals.push(new Interval(seconds.value, intensity.value));
};

const editDialogOpen = ref(false);

const edit = () => {
  editDialogOpen.value = true;
};

const duplicate = () => {
  workout.value.intervals.splice(selectedIndex.value, 0, clone(selectedInterval.value));
  selectedIndex.value++;
};

const remove = () => {
  const intervals = workout.value.intervals;
  intervals.splice(selectedIndex.value, 1);
  if (intervals.length > 0) {
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else {
    selectedIndex.value = null;
  }
};

const isSaveDisabled = computed(() => {
  return workout.value.name.length === 0 || workout.value.intervals.length === 0;
});
</script>
