<template>
  <ArrowLeftIcon class="w-5 h-5 cursor-pointer" @click="router.back()" />
</template>

<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
