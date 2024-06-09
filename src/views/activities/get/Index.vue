<template>
  <Form class="h-full">
    <div class="flex justify-between gap-4">
      <Back />
      <Dots>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="exportGraphic">Export graphic</DropdownMenuItem>
          <DropdownMenuItem @click="remove">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </Dots>
    </div>
    <Header :activity="activity" />
    <Chart class="shrink-0 border border-shade-7 aspect-[5/2]">
      <ChartLines />
      <ChartLaps
        :laps="laps"
        :selection="selection"
        @update:selection="
          selection = $event;
          $refs.table.scrollTo($event);
        "
      />
      <ChartHeartRate class="pointer-events-none" :polylines="activity.polylinesHeartRate" />
      <ChartPower class="pointer-events-none" :polylines="activity.polylinesPower" />
    </Chart>

    <FormItem class="flex-1">
      <Label>Laps</Label>
      <Laps ref="table" class="flex-1" :items="laps" v-model:selected-index="selection" />
    </FormItem>
    <Button @click="exportTcx">Export TCX</Button>
  </Form>
</template>

<script setup>
import Back from '@/components/Back.vue';
import Dots from '@/components/Dots.vue';
import Laps from '@/components/Laps.vue';
import Chart from '@/components/chart/Chart.vue';
import ChartHeartRate from '@/components/chart/ChartHeartRate.vue';
import ChartLaps from '@/components/chart/ChartLaps.vue';
import ChartLines from '@/components/chart/ChartLines.vue';
import ChartPower from '@/components/chart/ChartPower.vue';
import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Form, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useActivitiesStore } from '@/stores/activities';
import { dialog } from '@/utils/dialog';
import { download } from '@/utils/filesystem';
import { powerToSpeed } from '@/utils/speed';
import { formatDate } from '@/utils/time';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../Header.vue';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const { activities } = storeToRefs(useActivitiesStore());

const selection = ref(null);
const activity = activities.value[props.index];
const laps = activity.laps;

const filename = `${formatDate(activity.date, 'YYMMDD')} - ${activity.workout.name}`;

const exportTcx = () => {
  download(
    activity.tcx((power) => powerToSpeed(power)),
    `${filename}.tcx`,
    'application/vnd.garmin.tcx+xml',
  );
};

const color = (name) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};

const exportGraphic = () => {
  const w = 1000;
  const h = 0.4 * w;
  const x = (value) => (value / 100) * w;
  const y = (value) => (1 - value / 100) * h;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color('--shade-8');
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = color('--shade-7');
  for (const ry of [25, 50, 75]) {
    ctx.beginPath();
    ctx.moveTo(x(0), y(ry));
    ctx.lineTo(x(100), y(ry));
    ctx.stroke();
  }

  const data = [
    { polylines: activity.polylinesHeartRate, style: color('--red') },
    { polylines: activity.polylinesPower, style: color('--brand-3') },
  ];
  for (const { polylines, style } of data) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = style;
    for (const polyline of polylines) {
      ctx.beginPath();
      for (let i = 0; i < polyline.length; i += 2) {
        const rx = polyline[i];
        const ry = polyline[i + 1];
        if (i === 0) {
          ctx.moveTo(x(rx), y(ry));
        } else {
          ctx.lineTo(x(rx), y(ry));
        }
      }
      ctx.stroke();
    }
  }

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${filename}.png`;
  link.click();
};

const remove = async () => {
  const index = await dialog({
    content: 'Do you want to delete this activity?',
    buttons: [{ text: 'Delete' }, { text: 'Cancel', variant: 'secondary' }],
  });
  if (index === 0) {
    router.back();
    const store = useActivitiesStore();
    store.remove(props.index);
  }
};
</script>
