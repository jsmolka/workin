<template>
  <Form class="justify-center items-center h-full">
    Select a workout to start training.
    <Button @click="router.push('/workouts')" brand>Workouts</Button>
  </Form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import Form from '../../components/Form.vue';

const router = useRouter();
</script>
