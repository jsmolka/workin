<template>
  <Form class="h-full">
    <div class="flex flex-col">
      <span class="truncate text-gray-1 text-lg font-bold">{{
        formatDate(activity.date, 'HH:mm')
      }}</span>
      <span class="truncate">{{ formatDate(activity.date, 'MMMM D, YYYY') }}</span>
    </div>
    <ActivityDetails :activity="activity" />

    <Chart class="aspect-[3/1]">
      <ChartLines />
      <ChartHeartRate :data="activity.data" />
      <ChartPower :data="activity.data" />
    </Chart>

    <Label class="flex-1" text="Laps">
      <Laps class="flex-1" :laps="activity.laps" v-model:selection="selection" clickable />
    </Label>

    <div class="flex gap-4">
      <Button class="flex-1" @click="router.push({ name: 'activities' })">Back</Button>
      <Button class="flex-1" blue @click="tcx">Export TCX</Button>
    </div>
  </Form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../../../components/Button.vue';
import Form from '../../../components/Form.vue';
import Label from '../../../components/Label.vue';
import Chart from '../../../components/chart/Chart.vue';
import ChartHeartRate from '../../../components/chart/ChartHeartRate.vue';
import ChartLines from '../../../components/chart/ChartLines.vue';
import ChartPower from '../../../components/chart/ChartPower.vue';
import { useFormat } from '../../../composables/useFormat';
import { useActivitiesStore } from '../../../stores/activities';
import ActivityDetails from '../ActivityDetails.vue';
import Laps from './Laps.vue';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const { activities } = storeToRefs(useActivitiesStore());
const { formatDate } = useFormat();

const activity = computed(() => activities.value[props.index]);

const tcx = () => {};
</script>