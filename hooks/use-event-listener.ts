import { useEffect } from "react";

type EventListenerCallback<K extends keyof DocumentEventMap> = (this: Document, event: DocumentEventMap[K]) => void;

/**
 * Listen for an event listener
 */
const useEventListener = <K extends keyof DocumentEventMap>(event: K, callback: EventListenerCallback<K>) => {
  useEffect(() => {
    document.addEventListener(event, callback);

    return () => {
      document.removeEventListener(event, callback);
    }
  }, [event, callback]);
};

export default useEventListener;