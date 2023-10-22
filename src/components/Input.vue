<template>
  <input
    ref="input"
    :class="['input', { disabled }]"
    :value="value"
    v-bind="$attrs"
    @change="update"
    @focus="select"
  />
</template>

<script setup>
import { ref } from "vue";

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const value = defineModel("value", { required: true });

const update = (event) => {
  value.value = event.target.value;
};

const input = ref();

const select = () => {
  input.value.select();
};
</script>

<style lang="scss" scoped>
.input {
  @apply px-2;
  @apply py-1;
  @apply bg-gray-6;
  @apply rounded-sm;

  &:hover {
    @apply bg-gray-5;
  }

  &:focus {
    @apply outline-none;
    @apply ring-2;
    @apply ring-blue-3;
  }

  &[type="number"] {
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      @apply m-0;
      @apply appearance-none;
    }
  }
}
</style>
