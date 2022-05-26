import { useState, useEffect, PropsWithChildren } from "react"
import { createPortal } from "react-dom"

type PortalProps = {
  elementSelector: string;
}

const Portal = ({ elementSelector, children }: PropsWithChildren<PortalProps>) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children,
      document.querySelector(`#${elementSelector}`) as Element)
    : null
}

export default Portal