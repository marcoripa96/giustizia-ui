import { MutableRefObject, useEffect, useRef, useState } from "react";

const useBBox = (ref: MutableRefObject<HTMLElement | null>) => {
  const [bbox, setBBox] = useState<DOMRect | undefined>(undefined);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const bbox = ref.current.getBoundingClientRect();
    setBBox(bbox);
  }, [ref]);

  return bbox;
};

export default useBBox;