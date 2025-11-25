import { toast } from '@/utils/toast';
import { useDocumentVisibility, useEventListener, useWakeLock, whenever } from '@vueuse/core';

let warned = false;

export function useKeepAwake() {
  const wakeLock = useWakeLock();

  const request = async () => {
    if (!wakeLock.isSupported.value) {
      if (!warned) {
        toast('Wake lock is not supported.', { type: 'warning' });
        warned = true;
      }
      return;
    }

    if (wakeLock.isActive.value) {
      return;
    }

    await wakeLock.request();
    if (!wakeLock.isActive.value) {
      toast('Could not acquire wake lock.', { type: 'warning' });
    }
  };

  const visibility = useDocumentVisibility();

  const keepAwake = () => {
    whenever(() => visibility.value === 'visible', request, { immediate: true });
  };

  useEventListener(window, 'click', keepAwake, { once: true });
}
