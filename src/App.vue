<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="flex flex-col max-w-md m-4">
      <RouterView v-if="isSupported" />
      <Card v-else>
        Your browser doesn't support Bluetooth. Click
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility">here</a>
        to learn more.
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useBluetooth } from '@vueuse/core';
import Card from './components/Card.vue';

const { isSupported } = useBluetooth();
</script>
