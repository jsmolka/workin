<template>
  <div class="flex justify-center items-center h-full p-4">
    <Form class="items-center max-w-screen-sm">
      <Markdown :content="content" />
      <Button @click="router.push('/')">Continue</Button>
    </Form>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';
import Form from '../../components/Form.vue';
import Markdown from '../../components/Markdown.vue';

const router = useRouter();

const content = `
# No Web Bluetooth Support

The Web Bluetooth API is used to communicate with heart rate monitors and smart trainers.
It is currently only supported by [Chromium browsers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility).
Chrome on iOS devices [doesn't support Web Bluetooth](https://support.google.com/chrome/answer/6362090?hl=en&co=GENIE.Platform%3DiOS).
You will need to use an app like [Bluefy](https://apps.apple.com/us/app/bluefy-web-ble-browser/id1492822055) that does.
`;
</script>
