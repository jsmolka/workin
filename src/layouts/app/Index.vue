<template>
  <div class="flex flex-col h-full">
    <ContainerWrapper class="h-full">
      <Container class="relative flex-1 h-full">
        <Card class="absolute inset-0 m-4 overflow-y-auto">
          <RouterView />
        </Card>
      </Container>
    </ContainerWrapper>
    <ContainerWrapper class="bg-gray-6">
      <Container>
        <nav class="flex justify-between">
          <Link class="flex-1" name="train">Train</Link>
          <Link class="flex-1" name="workouts">Workouts</Link>
          <Link class="flex-1" name="activities">Activities</Link>
          <Link class="flex-1" name="settings">Settings</Link>
        </nav>
      </Container>
    </ContainerWrapper>
  </div>
</template>

<script setup>
import Container from './Container.vue';
import ContainerWrapper from './ContainerWrapper.vue';
import { Card } from '../../components';
import Link from './Link.vue';
</script>
