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
              className="font-mono text-[12px] font-semibold tracking-[0.22em] text-fg-primary hover:text-[#00FF94] transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}

        {/* Download CV — juste après CONTACT */}
        <li>
          <a
            href="/samih-habbani-cv.pdf"
            download
            className="group relative flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-[#030303] overflow-hidden rounded-sm transition-transform duration-150 hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#00FF94', boxShadow: '0 0 12px rgba(0,255,148,0.25)', padding: '6px 14px' }}
          >
            {/* shimmer sweep */}
            <span
              className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
            />
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="flex-shrink-0">
              <path d="M7 1.5v7M7 8.5 4.5 6M7 8.5 9.5 6" stroke="#030303" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 11.5h10" stroke="#030303" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            CV
          </a>
        </li>
      </ul>
    </motion.nav>
  )
}
