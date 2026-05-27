import { useState, useEffect } from 'react'

/** Typewriter hook — types text character by character with natural variance */
export function useTypewriter(
  text: string,
  options: {
    speed?: number      // base ms per char
    delay?: number      // ms before starting
    enabled?: boolean
    onComplete?: () => void
  } = {}
) {
  const { speed = 40, delay = 0, enabled = true, onComplete } = options
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone]           = useState(false)

  useEffect(() => {
    if (!enabled) return
    let charIndex = 0
    let timeout: ReturnType<typeof setTimeout>

    const startTimer = setTimeout(() => {
      const type = () => {
        if (charIndex < text.length) {
          setDisplayText(text.slice(0, charIndex + 1))
          charIndex++
          const variance = speed * 0.5
          timeout = setTimeout(type, speed - variance / 2 + Math.random() * variance)
        } else {
          setIsDone(true)
          onComplete?.()
        }
      }
      type()
    }, delay)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay, enabled])

  return { displayText, isDone }
}

/** Returns true once the element has entered the viewport (fires once) */
export function useInViewOnce(threshold = 0.15) {
  const [inView, setInView]   = useState(false)
  const [node,   setNode]     = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!node || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [node, inView, threshold])

  return { ref: setNode, inView }
}
