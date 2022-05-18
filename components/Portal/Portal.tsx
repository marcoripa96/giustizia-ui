import { useState, useEffect, PropsWithChildren } from "react"
import { createPortal } from "react-dom"

const Portal = ({ children }: PropsWithChildren<{}>) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children,
      document.querySelector("#select-popup") as Element)
    : null
}

export default Portal