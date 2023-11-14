<template>
  <div class="grid place-items-center h-full">
    <Form>
      <p>Select a workout to start training</p>
      <Button @click="router.push({ name: 'workouts' })" blue>Workouts</Button>
    </Form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import Form from '../../components/Form.vue';

const router = useRouter();
</script>
