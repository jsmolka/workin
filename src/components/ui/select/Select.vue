<template>
  <SelectRoot v-model="selectModelValue" v-bind="$attrs">
    <SelectTrigger :class="props.class">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="(item, index) in items" :value="index.toString()">
        <slot name="item" :item="item" :index="index">
          <SelectItemText>
            {{ item }}
          </SelectItemText>
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
} from '@/components/ui/select';
import { computed } from 'vue';

const modelValue = defineModel({ required: false });

const props = defineProps({
  class: { required: false },
  items: { type: Array, default: [] },
  placeholder: { type: String, required: false },
});

const modelIndex = computed(() => {
  return props.items.indexOf(modelValue.value);
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
</script>
