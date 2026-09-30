'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { METHODOLOGY_STEPS, AUDIENCES, DELIVERY_FORMATS, LANGUAGES } from '@/data/training'
import { IconGraduation, IconLayout, IconGlobe } from './Icons'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function ApproachFormats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative w-full"
      style={{
        paddingTop:    'clamp(48px,6vw,88px)',
        paddingBottom: 'clamp(48px,6vw,88px)',
        paddingLeft:   'clamp(24px,10vw,160px)',
        paddingRight:  'clamp(24px,10vw,160px)',
        scrollMarginTop: '80px',
        backgroundColor: '#050505',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
        style={{ marginBottom: '28px' }}
      >
        <IconGraduation size={16} color="#FFB800" />
        <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase" style={{ color: '#FFB800' }}>
          03 · APPROACH & DELIVERY
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,184,0,0.3)' }} />
      </motion.div>

      {/* Methodology */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
        className="font-mono font-bold"
        style={{ fontSize: 'clamp(32px,4.5vw,64px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#E8E8E0', marginBottom: '32px' }}
      >
        PRACTICAL BEFORE
        <br />
        <span style={{ color: '#FFB800' }}>THEORETICAL</span>
      </motion.h2>

      <div className="flex flex-wrap items-center" style={{ gap: '10px', marginBottom: '20px' }}>
        {METHODOLOGY_STEPS.map((s, i) => (
          <div key={s.step} className="flex items-center" style={{ gap: '10px' }}>
            <span className="font-mono text-[11px] font-bold" style={{ color: '#FFB800', border: '1px solid rgba(255,184,0,0.3)', backgroundColor: 'rgba(255,184,0,0.06)', padding: '6px 12px', letterSpacing: '0.1em' }}>
              {s.step}
            </span>
            {i < METHODOLOGY_STEPS.length - 1 && <span style={{ color: '#ffffff', opacity: 0.3 }}>→</span>}
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '56px' }} />

      {/* Audiences */}
      <div className="flex items-center gap-2" style={{ marginBottom: '16px' }}>
        <IconGraduation size={14} color="#FFB800" />
        <p className="font-mono text-[10px] font-semibold" style={{ color: '#ffffff', letterSpacing: '0.18em', margin: 0 }}>
          AUDIENCES I TRAIN
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '56px' }}>
        {AUDIENCES.map(a => (
          <div key={a.title} style={{ backgroundColor: '#0A0A0A', padding: '18px 20px' }}>
            <p className="font-mono font-semibold" style={{ fontSize: '12px', color: '#E8E8E0', marginBottom: '5px' }}>{a.title}</p>
            <p className="font-sans text-[11px]" style={{ color: '#ffffff', opacity: 0.6, lineHeight: 1.5 }}>{a.desc}</p>
          </div>
        ))}
      </div>

      {/* Delivery formats + languages */}
      <div>
        <div className="flex items-center gap-2" style={{ marginBottom: '14px' }}>
          <IconLayout size={14} color="#FFB800" />
          <p className="font-mono text-[10px] font-semibold" style={{ color: '#ffffff', letterSpacing: '0.18em', margin: 0 }}>
            DELIVERY FORMATS
          </p>
        </div>
        <div className="flex flex-wrap gap-2" style={{ marginBottom: '32px' }}>
          {DELIVERY_FORMATS.map(f => (
            <span key={f} className="font-mono text-[11px]" style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 12px' }}>
              {f}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2" style={{ marginBottom: '14px' }}>
          <IconGlobe size={14} color="#FFB800" />
          <p className="font-mono text-[10px] font-semibold" style={{ color: '#ffffff', letterSpacing: '0.18em', margin: 0 }}>
            LANGUAGES
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {LANGUAGES.map(l => (
            <div key={l.lang} className="flex items-center gap-3">
              <span className="font-mono text-[12px]" style={{ color: '#E8E8E0' }}>{l.lang}</span>
              <span className="font-mono text-[10px]" style={{ color: '#00FF94', opacity: 0.8 }}>{l.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
