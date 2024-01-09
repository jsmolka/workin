<template>
  <span class="markdown" v-html="html" />
</template>

<script setup>
import { micromark } from 'micromark';
import { computed } from 'vue';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const html = computed(() => micromark(props.content));
</script>

<style lang="scss">
.markdown {
  @apply leading-relaxed;

  & > *:not(:first-child) {
    @apply mt-4;
  }

  & > h1:not(:first-child) {
    @apply mt-6;
  }

  h1 {
    @apply text-gray-1;
    @apply text-xl;
    @apply font-extrabold;
  }

  a {
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: var(--gray-5);
    text-decoration-skip-ink: none;
    text-decoration-thickness: 2px;
    text-underline-offset: spacing(0.5);
  }
}
</style>
