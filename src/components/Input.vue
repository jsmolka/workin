<template>
  <input
    ref="input"
    :class="{ disabled }"
    :value="value"
    v-bind="$attrs"
    @change="update"
    @focus="select"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useForceUpdate } from '../composables/useForceUpdate';

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const value = defineModel('value', {
  required: true,
});

const forceUpdate = useForceUpdate();

const update = (event) => {
  value.value = event.target.value;

  forceUpdate();
};

const input = ref();

const select = () => {
  input.value.select();
};
</script>

<style lang="scss" scoped>
input {
  @apply px-2;
  @apply py-1.5;
  @apply bg-shade-6;
  @apply rounded-sm;
  @apply cursor-text;

  &:hover {
    @apply bg-shade-5;
  }

  &:focus {
    @apply outline-none;
    @apply ring-2;
    @apply ring-brand-3;
  }

  &[type='number'] {
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      @apply m-0;
      @apply appearance-none;
    }
  }

  &::placeholder {
    @apply text-shade-3;
  }
}
</style>
