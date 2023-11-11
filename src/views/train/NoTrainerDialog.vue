<template>
  <Dialog ref="dialog" v-slot="{ hide }">
    <Form>
      <p>No smart trainer connected.</p>
      <div class="flex justify-end gap-4">
        <Button @click="hide">Cancel</Button>
        <Button @click="router.push({ name: 'settings' })" blue>Settings</Button>
      </div>
    </Form>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../../components/Button.vue';
import Dialog from '../../components/Dialog.vue';
import Form from '../../components/Form.vue';

const router = useRouter();

const dialog = ref();

defineExpose({
  show: () => dialog.value.show(),
  hide: () => dialog.value.hide(),
});
</script>
