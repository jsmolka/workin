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
  @apply px-1.5;
  @apply py-1;
  @apply bg-gray-3;
  @apply rounded;
  @apply hover:brightness-110;
  @apply focus:outline-none;
  @apply focus:ring-2;
  @apply focus:ring-blue;

  &[type='number'] {
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      appearance: none;
    }
  }
}
</style>
