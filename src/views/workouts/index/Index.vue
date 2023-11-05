<template>
  <Form class="h-full">
    <div class="flex flex-col">
      <div class="text-gray-1 text-lg font-bold">{{ workout.name }}</div>
      <div>{{ workout.zone.name }}</div>
    </div>

    <div class="flex gap-4">
      <div class="flex flex-col">
        <span>{{ duration }}</span>
        <span class="unit">Duration</span>
      </div>
      <div class="flex flex-col">
        <span>{{ calories }}</span>
        <span class="unit">cal</span>
      </div>
      <div class="flex flex-col">
        <span>{{ avgPower }}</span>
        <span class="unit">Avg W</span>
      </div>
      <div class="flex flex-col">
        <span>{{ maxPower }}</span>
        <span class="unit">Max W</span>
      </div>
    </div>

    <Graphic
      class="w-full bg-gray-8 aspect-[3/1]"
      :intervals="workout.intervals"
      :selection="selection"
      @update:selection="setSelection"
    />

    <Label class="flex-1" text="Intervals">
      <Intervals
        ref="intervals"
        class="flex-1"
        :intervals="workout.intervals"
        v-model:selection="selection"
      />
    </Label>

    <div class="flex gap-4">
      <Button class="flex-1" @click="router.push({ name: 'workouts' })">Back</Button>
      <Button blue class="flex-1">Select</Button>
    </div>
  </Form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../../../components/Button.vue';
import Form from '../../../components/Form.vue';
import Graphic from '../../../components/Graphic.vue';
import Intervals from '../../../components/Intervals.vue';
import Label from '../../../components/Label.vue';
import { Time } from '../../../modules/time';
import { useAthleteStore } from '../../../stores/athlete';
import { useWorkoutsStore } from '../../../stores/workouts';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const selection = ref(null);
const intervals = ref(null);

const setSelection = (index) => {
  if (index != null) {
    selection.value = index;
    intervals.value.scrollIntoView(index);
  }
};

const router = useRouter();
const { athlete } = storeToRefs(useAthleteStore());
const { workouts } = storeToRefs(useWorkoutsStore());

const workout = computed(() => workouts.value[props.index]);

const duration = computed(() => new Time(0, 0, workout.value.seconds).format());
const calories = computed(() => Math.round(workout.value.calories(athlete.value.ftp)));
const avgPower = computed(() => Math.round(workout.value.averageIntensity * athlete.value.ftp));
const maxPower = computed(() => Math.round(workout.value.maxIntensity * athlete.value.ftp));
</script>

<style lang="scss" scoped>
.unit {
  @apply text-gray-3;
  @apply text-xs;
  @apply font-medium;
  @apply uppercase;
  @apply whitespace-nowrap;
}
</style>
