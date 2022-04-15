import { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLDivElement>(cb: (event: DocumentEventMap['mousedown']) => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: DocumentEventMap['mousedown']) => {
      cb(event);
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return ref;
};

export default useClickOutside;