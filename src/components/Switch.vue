<template>
  <Switch
    v-model="value"
    :class="value ? 'bg-blue-3 hover:bg-blue-2' : 'bg-gray-6 hover:bg-gray-5'"
    class="flex w-11 h-6 items-center rounded-sm"
  >
    <div
      :class="value ? 'translate-x-6' : 'translate-x-1'"
      class="w-4 h-4 bg-gray-2 rounded-sm transform transition"
    />
  </Switch>
</template>

<script setup>
import { Switch } from '@headlessui/vue';

const value = defineModel('value', { type: Boolean, required: true });
</script>
