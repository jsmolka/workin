import { useDocumentVisibility, useEventListener, useWakeLock, whenever } from '@vueuse/core';

export function useKeepAwake() {
  const { request } = useWakeLock();
  const visibility = useDocumentVisibility();

  const keepAwake = () => {
    whenever(
      () => visibility.value === 'visible',
      () => request(),
      { immediate: true },
    );
  };

  useEventListener(window, 'click', keepAwake, { once: true });
}
