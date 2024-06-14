<template>
  <Layout v-if="layout" :layout="layout" />
  <RouterView v-else />
</template>

<script setup>
import { useEmitter } from '@/composables/useEmitter';
import Layout from '@/layouts/Layout.vue';
import { useSettingsStore } from '@/stores/settings';
import { log } from '@/utils/log';
import { platform } from '@/utils/platform';
import { stringify } from '@/utils/stringify';
import { toast } from '@/utils/toast';
import { useEventListener } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layout = computed(() => route.meta.layout);

const { settings } = storeToRefs(useSettingsStore());

useEmitter(log, '*', (_, ...args) => {
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
