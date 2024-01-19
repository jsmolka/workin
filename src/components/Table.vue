<template>
  <div class="relative border border-shade-7 rounded-sm overflow-y-auto">
    <table ref="table" class="v-table absolute inset-0">
      <tr
        v-for="(item, index) in data"
        :class="{ '!bg-brand-3 !text-shade-8': index === selection }"
        :data-index="index"
        @click="selection = index"
      >
        <slot :item="item" :index="index" />
      </tr>
    </table>
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

const table = ref();
const scrollTo = (index) => {
  const element = table.value.querySelector(`[data-index="${index}"`);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

defineExpose({ scrollTo });
</script>

<style lang="scss">
.v-table {
  @apply w-full;
  @apply table-fixed;
  @apply select-none;

  tr {
    @apply bg-shade-8;
    @apply odd:bg-shade-7;
    @apply cursor-pointer;

    &:hover {
      @apply bg-shade-6;
    }

    &:active {
      @apply bg-shade-5;
    }
  }

  td {
    @apply px-2;
    @apply py-1.5;
  }
}
</style>
