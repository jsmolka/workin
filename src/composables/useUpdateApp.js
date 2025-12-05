import { dialog } from '@/components/ui/dialog';
import { whenever } from '@vueuse/core';
import { useRegisterSW } from 'virtual:pwa-register/vue';

export function useUpdateApp() {
  const { needRefresh, updateServiceWorker } = useRegisterSW();

  whenever(needRefresh, async () => {
    const button = await dialog({
      content: 'A new version is available.',
      buttons: [
        { text: 'Update', variant: 'default' },
        { text: 'Cancel', variant: 'secondary' },
      ],
    });
    if (button === 0) {
      updateServiceWorker();
    }
  });
}
