<template>
  <DialogProgrammatic v-slot="{ close }">
    <Form>
      <FormItem>
        <Label>Redirect URL</Label>
        <Textarea class="h-32 w-64" v-model="redirectUrl" />
      </FormItem>
    </Form>
    <DialogFooter>
      <Button :disabled="code == null" @click="close(code)">OK</Button>
      <DialogClose>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
    </DialogFooter>
  </DialogProgrammatic>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter, DialogProgrammatic } from '@/components/ui/dialog';
import { Form, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { computed, ref } from 'vue';

const redirectUrl = ref('');

const code = computed(() => {
  if (!URL.canParse(redirectUrl.value)) {
    return null;
  }

  const url = new URL(redirectUrl.value);
  const code = url.searchParams.get('code');
  if (code.length !== 40) {
    return null;
  }
  return code;
});
</script>
