import type { Variants } from 'framer-motion'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
}

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.5, ease: EASE_OUT } },
}

export const deployLine: Variants = {
  hidden:  { scaleX: 0, originX: '0%' },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: EASE_OUT } },
}

export const charReveal: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.06, ease: 'linear' } },
}

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})
