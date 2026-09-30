'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DEV_TRAINING } from '@/data/training'
import { DevIcon } from './Icons'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function DevCatalog() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="dev-catalog"
      ref={sectionRef}
      className="relative w-full"
      style={{
        paddingTop:    'clamp(48px,6vw,88px)',
        paddingBottom: 'clamp(48px,6vw,88px)',
        paddingLeft:   'clamp(24px,10vw,160px)',
        paddingRight:  'clamp(24px,10vw,160px)',
        scrollMarginTop: '80px',
        backgroundColor: '#0A0A0A',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
        style={{ marginBottom: '24px' }}
      >
        <DevIcon id="code" size={16} />
        <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase" style={{ color: '#4A9EFF' }}>
          02 · DEVELOPMENT TRAINING
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(74,158,255,0.3)' }} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
        className="font-mono font-bold"
        style={{ fontSize: 'clamp(32px,4.5vw,64px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#E8E8E0', marginBottom: '32px' }}
      >
        FULL-STACK
        <br />
        <span style={{ color: '#4A9EFF' }}>DEVELOPMENT TRAINING</span>
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
        {DEV_TRAINING.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
            style={{ backgroundColor: '#050505', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div className="flex items-center gap-3">
              <DevIcon id={g.icon} size={20} />
              <h4 className="font-mono font-semibold" style={{ fontSize: '14px', color: '#E8E8E0' }}>{g.title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.topics.map(t => (
                <span key={t} className="font-mono text-[10px]" style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.12)', padding: '3px 9px' }}>
                  {t}
                </span>
              ))}
            </div>
            <p className="font-sans text-[11px]" style={{ color: '#ffffff', opacity: 0.5, lineHeight: 1.6 }}>
              {g.example}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
