'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

const LINKS = [
  { label: 'IDENTITY',    href: '#identity'  },
  { label: 'FWDAI',   href: '#fwdai'  },
  { label: 'DEV',  href: '#dev'   },
  { label: 'TEACH', href: '#teaching'   },
  { label: 'PROJECTS', href: '#projects'   },
  { label: 'METRICS', href: '#metrics'   },
  { label: 'NETWORK', href: '#trust'   },
  { label: 'TIMELINE', href: '#timeline'   },
  { label: 'CONTACT', href: '#contact'   },
]

export function Navbar({ showDelay = 4.0 }: { showDelay?: number }) {
  const { scrollY } = useScroll()
  const borderAlpha = useTransform(scrollY, [0, 80], [0, 0.08])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: showDelay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ backgroundColor: 'rgba(5,5,5,0.82)', paddingLeft:'1rem', paddingRight:'1rem' }}
      className="fixed top-0 left-0 right-0 z-[1000] h-16 px-10 flex items-center justify-between backdrop-blur-md"
    >
      {/* Bottom border appears on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-white"
        style={{ opacity: borderAlpha }}
      />

      {/* Logo */}
      <a
        href="/"
        className="font-mono text-sm font-bold tracking-[0.25em] text-fg-primary hover:text-accent transition-colors duration-200"
      >
        SH
      </a>

      {/* Nav links */}
      <ul className="hidden sm:flex items-center gap-8 list-none">
        {LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="font-mono text-[12px] font-medium tracking-[0.22em] text-fg-secondary hover:text-fg-primary transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
