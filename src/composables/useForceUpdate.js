import { getCurrentInstance } from 'vue';

export function useForceUpdate() {
  const instance = getCurrentInstance();
  return () => instance.proxy.$forceUpdate();
}
