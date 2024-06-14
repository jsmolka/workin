<template>
  <RecycleScroller
    ref="scroller"
    class="scroller"
    :items="items"
    :prerender="prerender"
    v-slot="{ item, index }"
  >
    <slot :item="item.item" :index="index" />
  </RecycleScroller>
</template>

<script setup>
import _ from 'lodash';
import { useId } from 'radix-vue';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { RecycleScroller } from 'vue-virtual-scroller';

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

const size = computed(() => toPx(props.size));
const sizeGap = computed(() => toPx(props.sizeGap));
const prerender = computed(() => Math.ceil(document.body.clientHeight / size.value));
const items = computed(() =>
  props.items.map((item, index) => ({
    id: useId(),
    size: size.value + (index === props.items.length - 1 ? 0 : sizeGap.value),
    item,
  })),
);

const scroller = ref();
onMounted(() => {
  scroller.value.$el.scrollTo = async (position) => {
    await nextTick();
    await nextTick();
    scroller.value.scrollToPosition(position.top);
  };

  const route = useRoute();
  watch(route, () => {
    scroller.value.scrollToPosition(0);
  });
});
</script>
