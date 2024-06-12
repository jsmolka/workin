<template>
  <Dialog>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>No Web Bluetooth</DialogTitle>
        <DialogDescription v-show="false">Web Bluetooth is not supported.</DialogDescription>
      </DialogHeader>
      <p>
        The Web Bluetooth API is used to communicate with heart rate monitors and smart trainers. It
        is currently only supported by
        <Link
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility"
          >Chromium browsers</Link
        >. Chrome on iOS devices
        <Link href="https://support.google.com/chrome/answer/6362090?hl=en&co=GENIE.Platform%3DiOS"
          >doesn't support Web Bluetooth</Link
        >. You will need to use an app like
        <Link href="https://apps.apple.com/us/app/bluefy-web-ble-browser/id1492822055">Bluefy</Link>
        that does.
      </p>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="secondary">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Link } from '@/components/ui/link';
</script>
