<template>
  <Switch
    v-model="value"
    class="flex items-center w-11 h-6 rounded-sm"
    :class="value ? 'bg-blue-3 hover:bg-blue-2' : 'bg-gray-6 hover:bg-gray-5'"
  >
    <div
      class="w-4 h-4 bg-gray-2 rounded-sm transform transition"
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
