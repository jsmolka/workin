<template>
  <Form class="justify-center items-center h-full">
    Select a workout to start training.
    <Button @click="router.push('/workouts')">Workouts</Button>
  </Form>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';
import Form from '../../components/Form.vue';

const router = useRouter();
</script>
