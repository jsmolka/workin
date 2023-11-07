<template>
  <div class="grid place-items-center h-full">
    <Form>
      <div>Select a workout to start training</div>
      <Button blue @click="router.push({ name: 'workouts' })">Workouts</Button>
    </Form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import Form from '../../components/Form.vue';

const router = useRouter();
</script>
