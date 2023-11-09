<template>
  <div ref="root" class="relative border border-gray-6 rounded-sm overflow-hidden">
    <div class="absolute inset-0 overflow-y-scroll">
      <div
        v-for="(item, index) in data"
        class="flex gap-4 px-2 py-1.5 odd:bg-gray-6 hover:bg-gray-5 cursor-pointer select-none"
        :class="[
          { '!bg-blue-3': index === selection },
          clickable ? 'cursor-pointer' : 'pointer-events-none',
        ]"
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
  clickable: {
    type: Boolean,
    default: false,
  },
});

const selection = defineModel('selection', {
  type: Number,
  required: false,
});

const root = ref();

const scrollTo = (index) => {
  const element = root.value.querySelector(`[data-index="${index}"`);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

defineExpose({ scrollTo });
</script>
