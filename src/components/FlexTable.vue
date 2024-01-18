<template>
  <div class="relative border border-shade-7 rounded-sm overflow-hidden">
    <div ref="items" class="absolute inset-0 overflow-y-auto select-none">
      <div
        v-for="(item, index) in data"
        class="flex gap-4 px-2 py-1.5 odd:bg-shade-7 hover:bg-shade-6 cursor-pointer"
        :class="{ '!text-shade-8 !bg-brand-3': index === selection }"
        :data-index="index"
        @click="selection = index"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const selection = defineModel('selection', {
  type: Number,
  default: null,
});

const items = ref();

const scrollTo = (index) => {
  const element = items.value.querySelector(`[data-index="${index}"`);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

defineExpose({ scrollTo });
</script>
