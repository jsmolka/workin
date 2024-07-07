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
import { Label } from '@/components/ui/label';
import { Interval } from '@/modules/interval';
import InputIntervalIntensity from '@/views/workouts/InputIntervalIntensity.vue';
import InputIntervalSeconds from '@/views/workouts/InputIntervalSeconds.vue';
import { computed, ref, watchEffect } from 'vue';

const open = defineModel('open', { type: Boolean, required: false });

const props = defineProps({
  interval: { type: Interval, default: null },
});

const seconds = ref(null);
const intensity = ref(null);

watchEffect(() => {
  seconds.value = props.interval?.seconds;
  intensity.value = props.interval?.intensity;
});

const close = () => {
  open.value = false;
};

const isSaveDisabled = computed(() => {
  return props.interval == null || seconds.value == null || intensity.value == null;
});

const save = () => {
  props.interval.seconds = seconds.value;
  props.interval.intensity = intensity.value;
  close();
};
</script>
