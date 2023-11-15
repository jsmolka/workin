<template>
  <Form class="h-full">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots>
        <Button @click="remove">Delete</Button>
      </Dots>
    </div>
    <Header :activity="activity" />
    <Chart class="aspect-[3/1]">
      <ChartLines />
      <ChartLaps
        :laps="laps"
        :total-seconds="activity.seconds"
        :selection="selection"
        @update:selection="
          selection = $event;
          table.scrollTo($event);
        "
      />
      <ChartHeartRate class="pointer-events-none" :data="activity.data" />
      <ChartPower class="pointer-events-none" :data="activity.data" />
    </Chart>
    <Label class="flex-1" text="Laps">
      <Laps ref="table" class="flex-1" :laps="laps" v-model:selection="selection" />
    </Label>
    <Button @click="tcx" blue>Export TCX</Button>
  </Form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Back from '../../../components/Back.vue';
import Button from '../../../components/Button.vue';
import Dots from '../../../components/Dots.vue';
import Form from '../../../components/Form.vue';
import Label from '../../../components/Label.vue';
import Chart from '../../../components/chart/Chart.vue';
import ChartHeartRate from '../../../components/chart/ChartHeartRate.vue';
import ChartLaps from '../../../components/chart/ChartLaps.vue';
import ChartLines from '../../../components/chart/ChartLines.vue';
import ChartPower from '../../../components/chart/ChartPower.vue';
import { useFormat } from '../../../composables/useFormat';
import { useActivitiesStore } from '../../../stores/activities';
import { useAthleteStore } from '../../../stores/athlete';
import { download } from '../../../utils/download';
import { powerToSpeed } from '../../../utils/equations';
import Header from '../Header.vue';
import Laps from './Laps.vue';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const { athlete } = storeToRefs(useAthleteStore());
const { activities } = storeToRefs(useActivitiesStore());
const { formatDate } = useFormat();

const activity = computed(() => activities.value[props.index]);
const laps = computed(() => activity.value.laps);

const table = ref();
const selection = ref(null);

const back = () => {
  router.push({ name: 'activities' });
};

const tcx = () => {
  download(
    activity.value.tcx((power) => powerToSpeed(power, { m: athlete.value.weight + 8 })),
    `${formatDate(activity.value.date, 'YYMMDD')} - ${activity.value.workout.name}.tcx`,
    'application/vnd.garmin.tcx+xml',
  );
};

const remove = () => {
  activities.value.splice(props.index, 1);
  back();
};
</script>
