<template>
  <div class="flex flex-col justify-center items-center h-full p-4">
    <Markdown class="max-w-screen-sm" :content="content" />
  </div>
</template>

<script setup>
import Markdown from '../components/Markdown.vue';

const content = `
# No Web Bluetooth Support

workin uses the Web Bluetooth API to communicate with heart rate monitors and smart trainers.
It is currently only supported by [Chromium browsers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility).
Chrome on iOS devices [doesn't support Web Bluetooth](https://support.google.com/chrome/answer/6362090?hl=en&co=GENIE.Platform%3DiOS).
You will need to use an app like [Bluefy](https://apps.apple.com/us/app/bluefy-web-ble-browser/id1492822055) that does.
`;
</script>
