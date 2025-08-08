<template>
  <SelectRoot v-model="selectModelValue" v-bind="$attrs">
    <SelectTrigger :class="props.class" :style="props.style">
      <SelectValue :placeholder="placeholder">
        <slot name="value" :value="modelValue" :index="modelIndex" />
      </SelectValue>
    </SelectTrigger>
    <SelectContent :key="itemsKey">
      <SelectItem v-for="(item, index) in items" :value="index.toString()">
        <slot name="item" :item="item" :index="index">
          <SelectItemText>{{ getDisplay(item) }}</SelectItemText>
        </slot>
      </SelectItem>
    </SelectContent>
  </SelectRoot>
</template>

<script setup>
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/index.js';
import { makeGet } from '@/utils/get.js';
import { computed, ref, watch } from 'vue';

const modelValue = defineModel({ required: false });

const props = defineProps({
  class: { required: false },
  displayExpr: { required: false },
  items: { type: Array, default: [] },
  keyExpr: { required: false },
  placeholder: { type: String, required: false },
  style: { required: false },
});

const getDisplay = computed(() => {
  return makeGet(props.displayExpr);
});

const getKey = computed(() => {
  return makeGet(props.keyExpr);
});

const modelIndex = computed(() => {
  const key = getKey.value(modelValue.value);
  return props.items.findIndex((item) => getKey.value(item) === key);
});

const selectModelValue = computed({
  get() {
    return modelIndex.value === -1
      ? undefined // For `placeholder` to work
      : modelIndex.value.toString();
  },
  set(value) {
    const index = parseInt(value);
    if (modelIndex.value !== index) {
      modelValue.value = props.items[index];
    }
  },
});

// Prevent problems with changing items
const itemsKey = ref(0);
watch(
  () => props.items,
  () => itemsKey.value++,
  { deep: true },
);
</script>
