<template>
  <LayoutNested :layouts="layouts" />
</template>

<script setup>
import LayoutNested from '@/layouts/LayoutNested.vue';
import { computed } from 'vue';

const props = defineProps({
  layout: { type: [Object, Array], required: true },
});

const layouts = computed(() => {
  return (props.layout instanceof Array ? props.layout : [props.layout]).map((layout) =>
    layout.component ? layout : { component: layout },
  );
});
</script>
