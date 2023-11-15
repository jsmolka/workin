<template>
  <button>
    <ArrowLeftIcon class="w-5 h-5" @click="router.back()" />
  </button>
</template>

<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
