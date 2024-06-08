<template>
  <Layout v-if="layout" :layout="layout" />
  <RouterView v-else />
</template>

<script setup>
import Layout from '@/layouts/Layout.vue';
import { stringify } from '@/utils/stringify';
import { useBluetooth, useEventListener } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmitter } from './composables/useEmitter';
import { useSettingsStore } from './stores/settings';
import { log } from './utils/log';
import { platform } from './utils/platform';
import { toast } from './utils/toast';

const route = useRoute();
const layout = computed(() => route.meta.layout);
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
