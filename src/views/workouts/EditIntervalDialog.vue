<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader v-show="false">
        <DialogTitle>Edit interval</DialogTitle>
        <DialogDescription>Edit interval</DialogDescription>
      </DialogHeader>
      <Form>
        <FormItem>
          <Label>Duration</Label>
          <InputIntervalSeconds v-model="seconds" />
        </FormItem>
        <FormItem>
          <Label>Intensity</Label>
          <InputIntervalIntensity v-model="intensity" />
        </FormItem>
        <FormItem>
          <Label>Text</Label>
          <Input v-model="text" />
        </FormItem>
      </Form>
      <DialogFooter>
        <Button :disabled="isSaveDisabled" @click="save">Save</Button>
        <Button variant="secondary" @click="close">Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Interval } from '@/modules/interval';
import InputIntervalIntensity from '@/views/workouts/InputIntervalIntensity.vue';
import InputIntervalSeconds from '@/views/workouts/InputIntervalSeconds.vue';
import { computed, ref, watch } from 'vue';

const open = defineModel('open', { type: Boolean, required: false });

const props = defineProps({
  interval: { type: Interval, default: null },
});

const seconds = ref(null);
const intensity = ref(null);
const text = ref('');

watch(
  () => props.interval,
  () => {
    seconds.value = props.interval?.seconds ?? null;
    intensity.value = props.interval?.intensity ?? null;
    text.value = props.interval?.text ?? '';
  },
  { immediate: true },
);

const close = () => {
  open.value = false;
};

const isSaveDisabled = computed(() => {
  return (
    props.interval == null ||
    seconds.value == null ||
    seconds.value === 0 ||
    intensity.value == null ||
    intensity.value === 0
  );
});

const save = () => {
  props.interval.seconds = seconds.value;
  props.interval.intensity = intensity.value;
  props.interval.text = text.value;
  close();
};
</script>
