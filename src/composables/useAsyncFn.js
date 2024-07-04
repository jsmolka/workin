import { ref } from 'vue';

export function useAsyncFn(fn, pending = ref(false)) {
  const wrapper = async (...args) => {
    pending.value = true;
    try {
      return await fn(...args);
    } finally {
      pending.value = false;
    }
  };
  return [wrapper, pending];
}
