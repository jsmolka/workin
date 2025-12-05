<template>
  <DialogProgrammatic v-bind="$attrs" v-slot="{ close }">
    <template v-if="isVNode(content)">
      <Component :is="content" />
    </template>
    <template v-else>
      {{ content }}
    </template>
    <DialogFooter v-if="buttons.length > 0">
      <Button v-for="(props, index) in buttons" v-bind="props" @click="close(index)">
        {{ props.text }}
      </Button>
    </DialogFooter>
  </DialogProgrammatic>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogProgrammatic } from '@/components/ui/dialog';
import { isVNode } from 'vue';

defineProps({
  content: { type: [String, Object], required: true },
  buttons: { type: Array, default: [] },
});
</script>
