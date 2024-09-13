<template>
  <RouterView />
</template>

<script setup>
import { useEmitter } from '@/composables/useEmitter';
import { useSettingsStore } from '@/stores/settings';
import { log } from '@/utils/log';
import { isMobile } from '@/utils/platform';
import { stringify } from '@/utils/stringify';
import { toast } from '@/utils/toast';
import { useEventListener } from '@vueuse/core';
import { storeToRefs } from 'pinia';

const { settings } = storeToRefs(useSettingsStore());

useEmitter(log, '*', (_, ...args) => {
  if (settings.value.logAsNotification) {
    toast(args.map(stringify).join(' '));
  }
});

if (isMobile) {
  useEventListener('error', ({ message }) => {
    toast(message);
  });
}
</script>
