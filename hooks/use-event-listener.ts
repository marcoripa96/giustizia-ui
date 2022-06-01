import { useEffect } from "react";

type DocumentEventListenerCallback<K extends keyof DocumentEventMap> = (this: Document, event: DocumentEventMap[K]) => void;
type WindowEventListenerCallback<K extends keyof WindowEventMap> = (this: Window, event: WindowEventMap[K]) => void;

/**
 * Listen for an event listener on document
 */
export const useDocumentEventListener = <K extends keyof DocumentEventMap>(event: K, callback: DocumentEventListenerCallback<K>) => {
  useEffect(() => {
    document.addEventListener(event, callback);

    return () => {
      document.removeEventListener(event, callback);
    }
  }, [event, callback]);
};

/**
 * Listen for an event listener on the window element
 */
export const useWindowEventListener = <K extends keyof WindowEventMap>(event: K, callback: WindowEventListenerCallback<K>) => {
  useEffect(() => {
    window.addEventListener(event, callback);

    return () => {
      window.removeEventListener(event, callback);
    }
  }, [event, callback]);
};
