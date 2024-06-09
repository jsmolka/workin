<template>
  <Form class="justify-center items-center h-full">
    <FormItem>
      <p>Select a workout to start training.</p>
      <Button @click="router.push('/workouts')">Workouts</Button>
    </FormItem>
  </Form>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { Form, FormItem } from '@/components/ui/form';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
