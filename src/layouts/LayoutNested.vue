<template>
  <Component :is="layout.component" v-bind="layout.props ?? {}">
    <LayoutNested v-if="nested.length > 0" :layouts="nested" />
  </Component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  layouts: { type: Array, required: true },
});

const layout = computed(() => props.layouts[0]);
const nested = computed(() => props.layouts.slice(1));
</script>
