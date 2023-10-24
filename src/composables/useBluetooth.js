import { readonly, ref } from 'vue';

const supported = 'bluetooth' in navigator;

const available = ref(null);
if (supported) {
  navigator.bluetooth.getAvailability().then((value) => (available.value = value));
  navigator.bluetooth.addEventListener(
    'availabilitychanged',
    ({ value }) => (available.value = value),
  );
} else {
  available.value = false;
}

export function useBluetooth() {
  return {
    supported,
    available: readonly(available),
  };
}
