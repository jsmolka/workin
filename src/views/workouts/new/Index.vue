<template>
  <Form class="h-full">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots>
        <MenuItem>
          <Button :class="{ disabled: selection == null }" @click="remove">Delete interval</Button>
        </MenuItem>
      </Dots>
    </div>
    <Label text="Name">
      <Input v-model:value="workout.name" />
    </Label>
    <Chart class="aspect-[3/1]">
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
    <div class="flex gap-4">
      <Label class="flex-1 min-w-0" text="Duration">
        <Input v-model:value="durationInput" />
      </Label>
      <Label class="flex-1 min-w-0" text="Intensity [% FTP]">
        <InputNumber :min="0" v-model:value="intensityInput" />
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
import { MenuItem } from '@headlessui/vue';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Back from '../../../components/Back.vue';
import Button from '../../../components/Button.vue';
import Dots from '../../../components/Dots.vue';
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
import { parseSeconds } from '../../../utils/datetime';

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

const router = useRouter();
const { custom } = storeToRefs(useWorkoutsStore());

const selection = ref(null);
const workout = reactive(new Workout());

const add = () => {
  workout.intervals.push(new Interval(duration.value, intensity.value));
};

const remove = () => {
  workout.intervals.splice(selection.value, 1);
  selection.value = null;
};

const save = () => {
  custom.value.push(workout);
  router.push(`/workouts/custom/${custom.value.length - 1}`);
};
</script>
