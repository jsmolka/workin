<template>
  <RecycleScroller
    ref="scroller"
    class="scroller"
    :items="items"
    :prerender="prerender"
    v-slot="{ item, index, active }"
  >
    <slot :item="item.item" :index="index" :active="active" />
  </RecycleScroller>
</template>

<script setup>
import { useResizeObserver } from '@vueuse/core';
import _ from 'lodash';
import { useId } from 'radix-vue';
import { computed, nextTick, onMounted, ref } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';

const scroller = ref();

const props = defineProps({
  items: { type: Array, required: true },
  size: { type: [Number, String], required: true },
  sizeGap: { type: [Number, String], default: 0 },
});

const fontSize = parseFloat(getComputedStyle(document.body).fontSize);

const toPx = (value) => {
  if (_.isNumber(value)) {
    return value;
  }
  if (_.isString(value)) {
    const number = parseFloat(value);
    if (value.endsWith('px')) {
      return number;
    }
    if (value.endsWith('rem')) {
      return number * fontSize;
    }
  }
  return 0;
};

const size = computed(() => {
  return toPx(props.size);
});

const sizeGap = computed(() => {
  return toPx(props.sizeGap);
});

const height = ref(0);
useResizeObserver(scroller, ([entry]) => {
  height.value = entry.contentRect.height;
});

const prerender = computed(() => {
  return Math.max(1, Math.ceil(height.value / size.value));
});

const items = computed(() => {
  return props.items.map((item, index) => ({
    id: useId(),
    size: size.value + (index === props.items.length - 1 ? 0 : sizeGap.value),
    item,
  }));
});

onMounted(() => {
  scroller.value.$el.scrollTo = async (...args) => {
    await nextTick();
    await nextTick();
    scroller.value?.scrollToPosition(args.length > 1 ? args[1] : args[0].top);
  };
});

defineExpose({
  scrollToPosition: (position) => {
    scroller.value.scrollToPosition(position);
  },
});
</script>
