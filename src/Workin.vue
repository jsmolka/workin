<template>
  <Navigation :pages="pages">
    <div class="relative flex-1">
      <Card class="absolute inset-0 m-4 overflow-y-auto">
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </Card>
    </div>
  </Navigation>
</template>

<script setup>
import { Card, Navigation } from './components';
import useAthleteStore from './stores/athlete';

const pages = [
  {
    text: 'Train',
    path: '/train',
  },
  {
    text: 'Workouts',
    path: '/workouts',
  },
  {
    text: 'Activities',
    path: '/activities',
  },
  {
    text: 'Settings',
    path: '/settings',
  },
];

const athleteStore = useAthleteStore();
athleteStore.$subscribe(() => athleteStore.persist());
</script>
