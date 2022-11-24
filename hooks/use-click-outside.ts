import { useEffect, useRef } from "react";

/**
 * Detect a click outisde of an element
 */
const useClickOutside = <T extends HTMLDivElement>(cb: (event: DocumentEventMap['mousedown']) => void) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: DocumentEventMap['mousedown']) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb(event);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);

  return ref;
};

export default useClickOutside;