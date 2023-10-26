import { readonly, ref } from 'vue';

const isSupported = 'bluetooth' in navigator;

const isAvailable = ref(null);
if (isSupported) {
  navigator.bluetooth.getAvailability().then((value) => (isAvailable.value = value));
  navigator.bluetooth.addEventListener(
    'availabilitychanged',
    ({ value }) => (isAvailable.value = value),
  );
} else {
  isAvailable.value = false;
}

export function useBluetooth() {
  return {
    isSupported,
    isAvailable: readonly(isAvailable),
  };
}
