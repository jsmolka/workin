<template>
  <input class="input" :class="{ disabled }" v-bind="props" @input="$emit('update:value', $event.target.value)" />
</template>

<script setup>
const props = defineProps({
  value: {
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['update:value']);
</script>

<style lang="scss" scoped>
.input {
  @apply px-2;
  @apply py-1;
  @apply bg-gray-6;
  @apply rounded-sm;
  @apply hover:bg-gray-5;
  @apply focus:outline-none;
  @apply focus:ring-2;
  @apply focus:ring-blue-3;

  &[type='number'] {
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      @apply m-0;
      @apply appearance-none;
    }
  }
}
</style>
