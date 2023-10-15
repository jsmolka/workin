<script setup>
import { reactive, ref } from 'vue'
import HeartRateSensor from '../bluetooth/heartRateSensor';

defineProps({
  msg: String,
})

const sensor = reactive(new HeartRateSensor())

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="sensor.connect()">Connect</button>
    <div v-if="sensor.heartRate != null">Heart rate is {{ sensor.heartRate }}</div>
    <div v-else>RIP</div>

    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
