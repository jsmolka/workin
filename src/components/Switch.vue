<template>
  <Switch
    class="flex items-center w-11 h-6 rounded-sm transition-colors"
    :class="
      value
        ? 'bg-brand-3 hover:bg-brand-2 active:bg-brand-1'
        : 'bg-shade-6 hover:bg-shade-5 active:bg-shade-4'
    "
    v-model="value"
  >
    <div
      class="w-4 h-4 bg-shade-2 rounded-sm transform transition-transform"
      :class="value ? 'translate-x-6' : 'translate-x-1'"
    />
  </Switch>
</template>

<script setup>
import { Switch } from '@headlessui/vue';

const value = defineModel('value', {
  type: Boolean,
  required: true,
});
</script>
