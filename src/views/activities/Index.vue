<template>
  <Form v-if="activities.length > 0">
    <RouterLink v-for="(activity, index) in activities" :to="`/activities/${index}`">
      <Activity :activity="activity" />
    </RouterLink>
  </Form>
  <div v-else class="grid place-items-center h-full">No activities, yet.</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Form from '../../components/Form.vue';
import { useActivitiesStore } from '../../stores/activities';
import Activity from './Activity.vue';

const { activities } = storeToRefs(useActivitiesStore());
</script>
