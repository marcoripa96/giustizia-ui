import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

export function useAtBottom(offset = 0) {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtBottom(
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - offset
      )
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [offset])

  return isAtBottom
}

interface ChatScrollAnchorProps {
  trackVisibility?: boolean
}

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const isAtBottom = useAtBottom()
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: '0px 0px -150px 0px'
  })

  useEffect(() => {
    // if (isAtBottom && !inView) {
    //   console.log('test')
    entry?.target.scrollIntoView({
      block: 'start'
    })
    // }
  }, [inView, entry, isAtBottom])

  return <div ref={ref} className="h-px w-full" />
}