import { useCallback, useEffect, useRef, useState } from "react";

function useThrottle(
  function_: Function,
  timeout: number = 300
): (...args: any) => any {
  const [ready, setReady] = useState(true);
  const timerRef = useRef<number | undefined>(undefined);


  const throttledFunction = useCallback(
    (...args) => {
      if (!ready) {
        return;
      }

      setReady(false);
      function_(...args);
    },
    [ready, function_]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!ready) {
        timerRef.current = window.setTimeout(() => {
          setReady(true);
        }, timeout);

        return () => window.clearTimeout(timerRef.current);
      }
    } else {
      console.warn("useThrottle: window is undefined.");
    }
  }, [ready, timeout]);

  return throttledFunction;
}

export { useThrottle };