<template>
  <Dialog v-model:open="open" v-slot="{ close }">
    <Form>
      <p>No smart trainer connected.</p>
      <div class="flex justify-end gap-4">
        <Button @click="close">Cancel</Button>
        <Button @click="router.push({ name: 'settings' })" blue>Settings</Button>
      </div>
    </Form>
  </Dialog>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import Dialog from '../../components/Dialog.vue';
import Form from '../../components/Form.vue';

const open = defineModel('open', {
  type: Boolean,
  required: true,
});

const router = useRouter();
</script>
