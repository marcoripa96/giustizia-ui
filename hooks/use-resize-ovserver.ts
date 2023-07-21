import { MutableRefObject, useEffect, useRef } from "react"

const useResizeObserver = <T extends HTMLElement>(elRef: MutableRefObject<T | null>, callback: (entries: ResizeObserverEntry[]) => void) => {
  const observer = useRef(
    typeof window !== 'undefined' ?
      new ResizeObserver(entries => {
        callback(entries);
      }) : null
  )

  useEffect(() => {
    if (!elRef.current) return;

    observer.current?.observe(elRef.current)

    return () => {
      if (!elRef.current) return;
      observer.current?.unobserve(elRef.current)
    }
  }, [elRef])
}

export default useResizeObserver;