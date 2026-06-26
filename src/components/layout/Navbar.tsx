'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'IDENTITY',    href: '#identity'  },
  { label: 'FWDAI',       href: '#fwdai'     },
  { label: 'DEV',         href: '#dev'       },
  { label: 'TEACH',       href: '#teaching'  },
  { label: 'PROJECTS',    href: '#projects'  },
  { label: 'METRICS',     href: '#metrics'   },
  { label: 'NETWORK',     href: '#trust'     },
  { label: 'TIMELINE',    href: '#timeline'  },
  { label: 'CONTACT',     href: '#contact'   },
]

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <motion.span
        animate={open ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="block h-px w-full bg-white origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-full bg-white"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="block h-px w-full bg-white origin-center"
      />
    </div>
  )
}

export function Navbar({ showDelay = 4.0 }: { showDelay?: number }) {
  const { scrollY } = useScroll()
  const borderAlpha = useTransform(scrollY, [0, 80], [0, 0.08])
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
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

        {/* Nav links — desktop */}
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

          <li>
            <a
              href="/samih-habbani-cv.pdf"
              download
              className="group relative flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-[#030303] overflow-hidden rounded-sm transition-transform duration-150 hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#00FF94', boxShadow: '0 0 12px rgba(0,255,148,0.25)', padding: '6px 14px' }}
            >
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
          <li>
            <a
              href="https://drive.google.com/drive/folders/1qHCAbXmXpKW9iGH2L89JghJ5tYGa2y5H?usp=sharing"
              className="group relative flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-[#030303] overflow-hidden rounded-sm transition-transform duration-150 hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#00D4FF', boxShadow: '0 0 12px rgba(0,255,148,0.25)', padding: '6px 14px' }}
            >
              <span
                className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
              />
              STUDENTS ACCESS
            </a>
          </li>
        </ul>

        {/* Burger button — mobile only */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="sm:hidden relative z-[1100] p-2 -mr-2"
        >
          <BurgerIcon open={menuOpen} />
        </button>
      </motion.nav>

      {/* Mobile full-page side menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[1050] sm:hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            />

            {/* Slide-in panel */}
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[1060] sm:hidden flex flex-col"
              style={{
                width: 'min(320px, 85vw)',
                backgroundColor: 'rgba(8,8,8,0.97)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Vertical accent line */}
              <div
                className="absolute top-0 left-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, transparent, #00FF94 30%, #00D4FF 70%, transparent)' }}
              />

              {/* Header */}
              <div className="flex items-center justify-between px-8 h-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="font-mono text-sm font-bold tracking-[0.25em] text-white">SH</span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">MENU</span>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-10 gap-1">
                {LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.045, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center gap-4 py-3 font-mono text-[13px] font-semibold tracking-[0.25em] text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <span
                      className="h-px transition-all duration-300 group-hover:w-6"
                      style={{ width: '12px', backgroundColor: '#00FF94' }}
                    />
                    {label}
                  </motion.a>
                ))}
              </nav>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.35 }}
                className="px-8 pb-10 flex flex-col gap-3"
              >
                <a
                  href="/samih-habbani-cv.pdf"
                  download
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] text-[#030303] rounded-sm py-3"
                  style={{ backgroundColor: '#00FF94', boxShadow: '0 0 20px rgba(0,255,148,0.2)' }}
                >
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1.5v7M7 8.5 4.5 6M7 8.5 9.5 6" stroke="#030303" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 11.5h10" stroke="#030303" strokeWidth="1.7" strokeLinecap="round"/>
                  </svg>
                  TÉLÉCHARGER CV
                </a>
                <a
                  href="https://drive.google.com/drive/folders/1qHCAbXmXpKW9iGH2L89JghJ5tYGa2y5H?usp=sharing"
                  onClick={closeMenu}
                  className="flex items-center justify-center font-mono text-[11px] font-bold tracking-[0.2em] text-[#030303] rounded-sm py-3"
                  style={{ backgroundColor: '#00D4FF', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}
                >
                  STUDENTS ACCESS
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
