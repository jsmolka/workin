<template>
  <Form>
    <RouterLink
      v-for="(activity, index) in activities"
      :to="{ name: 'activity', params: { index } }"
    >
      <Activity :activity="activity" />
    </RouterLink>
  </Form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Form from '../../components/Form.vue';
import { useActivitiesStore } from '../../stores/activities';
import Activity from './Activity.vue';

const { activities } = storeToRefs(useActivitiesStore());
</script>
