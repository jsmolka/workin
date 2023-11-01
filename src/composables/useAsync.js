import { ref } from 'vue';

export function useAsync(fn) {
  const pending = ref(false);
  const wrapper = async (...args) => {
    pending.value = true;
    try {
      await fn(...args);
    } finally {
      pending.value = false;
    }
  };
  return [wrapper, pending];
}
