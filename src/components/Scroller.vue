<template>
  <RecycleScroller
    ref="scroller"
    class="scroller"
    :items="items"
    :prerender="prerender"
    v-bind="$attrs"
    v-slot="{ item, index }"
  >
    <slot :item="item.item" :index="index" />
  </RecycleScroller>
</template>

<script setup>
import { nanoid } from 'nanoid';
import { computed, nextTick, onMounted, ref } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  size: {
    type: [Number, String],
    required: true,
  },
  sizeGap: {
    type: [Number, String],
    default: 0,
  },
});

const fontSize = parseFloat(getComputedStyle(document.body).fontSize);

const toPx = (value) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
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

const prerender = computed(() => {
  return Math.round(document.body.clientHeight / size.value);
});

const items = computed(() => {
  return props.items.map((item, index, items) => ({
    id: nanoid(),
    size: size.value + (index === items.length - 1 ? 0 : sizeGap.value),
    item,
  }));
});

const scroller = ref();
onMounted(() => {
  scroller.value.$el.scrollTo = async (position) => {
    await nextTick();
    await nextTick();
    scroller.value.scrollToPosition(position.top);
  };
});
</script>
