import { useCallback, useRef } from 'react';

export const useThrottle = <T extends (...args: unknown[]) => void>(callback: T, delay: number) => {
  const lastCall = useRef(0);

  return useCallback((...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      return callback(...args);
    }
  }, [callback, delay]);
};
