import { getCurrentInstance } from 'vue';

export default function useForceUpdate() {
  const instance = getCurrentInstance();
  return () => instance.proxy.$forceUpdate();
}
