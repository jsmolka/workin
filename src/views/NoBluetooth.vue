<template>
  <div class="markdown flex flex-col justify-center items-center h-full p-4">
    <p>
      The Web Bluetooth API is used to communicate with heart rate monitors and smart trainers. It
      is currently only supported by
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility"
        target="_blank"
        >Chromium browsers</a
      >. Chrome on iOS devices
      <a
        href="https://support.google.com/chrome/answer/6362090?hl=en&co=GENIE.Platform%3DiOS"
        target="_blank"
        >doesn't support Web Bluetooth</a
      >. You will need to use an app like
      <a href="https://apps.apple.com/us/app/bluefy-web-ble-browser/id1492822055" target="_blank"
        >Bluefy</a
      >
      that does.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.markdown {
  p {
    @apply max-w-screen-sm;
    @apply leading-relaxed;
  }

  a {
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: var(--gray-5);
    text-decoration-skip-ink: none;
    text-decoration-thickness: 2px;
    text-underline-offset: spacing(0.5);
  }
}
</style>
