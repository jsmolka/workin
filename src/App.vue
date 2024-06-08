<template>
  <Component v-if="route.meta.layout" :is="route.meta.layout">
    <RouterView />
  </Component>
  <RouterView v-else />
</template>

<script setup>
import { stringify } from '@/utils/stringify';
import { useBluetooth, useEventListener } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useEmitter } from './composables/useEmitter';
import { useSettingsStore } from './stores/settings';
import { log } from './utils/log';
import { platform } from './utils/platform';
import { toast } from './utils/toast';

const route = useRoute();
const router = useRouter();
const { isSupported } = useBluetooth();

if (!isSupported.value) {
  router.push('/bluetooth');
}

const { settings } = storeToRefs(useSettingsStore());

useEmitter(log, '*', (level, ...args) => {
  if (settings.value.logAsNotification) {
    toast(args.map(stringify).join(' '));
  }
});

if (platform.isMobile()) {
  useEventListener('error', ({ message }) => {
    toast(message);
  });
}
</script>
