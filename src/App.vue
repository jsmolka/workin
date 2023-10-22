<template>
  <Workin v-if="bluetooth" class="max-w-screen-sm h-full mx-auto" />
  <div v-else class="flex justify-center items-center h-full">
    <Card class="max-w-screen-sm m-4">
      Your browser doesn't support Bluetooth. Click
      <a
        class="text-blue-3"
        href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility"
        >here</a
      >
      to learn more.
    </Card>
  </div>
</template>

<script setup>
import Card from "./components/Card.vue";
import Workin from "./views/Workin.vue";

const bluetooth = navigator && "bluetooth" in navigator;
</script>
