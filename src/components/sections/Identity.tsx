'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { IDENTITY } from '@/data/portfolio'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Status config ─────────────────────────────────────────
const STATUS_CFG: Record<string, { color: string; label: string }> = {
  DEPLOYED:  { color: '#00FF94', label: 'DEPLOYED'  },
  ACTIVE:    { color: '#4A9EFF', label: 'ACTIVE'    },
  RUNNING:   { color: '#FFB800', label: 'RUNNING'   },
  AUTOMATED: { color: '#00D4FF', label: 'AUTOMATED' },
}

// ── Pulsing status dot ────────────────────────────────────
function StatusDot({ status }: { status: string }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.RUNNING
  return (
    <span className="relative inline-flex items-center justify-center w-3 h-3 flex-shrink-0">
      <motion.span
        className="absolute inline-block w-3 h-3 rounded-full opacity-30"
        style={{ backgroundColor: cfg.color }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      />
      <span className="relative inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
    </span>
  )
}

// ── Section label ──────────────────────────────────────────
function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-14">
      <span className="font-mono text-xs" style={{ color: '#4A4A44', letterSpacing: '0.25em' }}>
        //
      </span>
      <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase" style={{ color: '#4A4A44' }}>
        {index} · {title}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
    </div>
  )
}

export function Identity() {
  const [activeId, setActiveId] = useState(IDENTITY.dimensions[0].id)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const activeDim = IDENTITY.dimensions.find(d => d.id === activeId)!

  // ── Container variants ──────────────────────────────────
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden:  { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  }

  const rightPanelVariants = {
    hidden:  { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: EASE } },
    exit:    { opacity: 0, y: -6, transition: { duration: 0.2,  ease: 'easeIn' as const } },
  }

  return (
    <section
      id="identity"
      ref={sectionRef}
      className="relative w-full py-28"
      style={{ paddingLeft: 'clamp(48px,10vw,160px)', paddingRight: 'clamp(48px,10vw,160px)', paddingTop: 'clamp(40px,4.5vw,72px)'}}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel index="02" title="IDENTITY" />
      </motion.div>

      {/* Headline */}
      <motion.p
        className="font-mono mb-16"
        style={{ fontSize: 'clamp(22px, 3vw, 38px)', color: '#E8E8E0', letterSpacing: '-0.02em', maxWidth: '640px' }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
      >
        {IDENTITY.headline}
      </motion.p>

      {/* ── DESKTOP: split panel ──────────────────────────── */}
      <div className="hidden lg:grid lg:grid-cols-[340px_1fr] gap-0">

        {/* LEFT — module selector */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="pr-12 flex flex-col gap-1"
          style={{paddingRight: '1rem'}}
        >
          {IDENTITY.dimensions.map((dim, i) => {
            const isActive = dim.id === activeId
            const cfg = STATUS_CFG[dim.status] ?? STATUS_CFG.RUNNING
            return (
              <motion.button
                key={dim.id}
                variants={itemVariants}
                onClick={() => setActiveId(dim.id)}
                className="group w-full text-left py-5 px-0 flex flex-col gap-2 border-b transition-colors duration-200 relative"
                style={{ borderColor: 'rgba(255,255,255,0.06)', paddingLeft: '0.5rem' }}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-0 bottom-0 w-px"
                    style={{ backgroundColor: cfg.color }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                )}

                <div className="flex items-center justify-between pl-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs"
                      style={{ color: isActive ? '#4A4A44' : '#1E1E1A', letterSpacing: '0.2em' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-mono text-sm font-medium transition-colors duration-200"
                      style={{ color: isActive ? '#E8E8E0' : '#2A2A26', letterSpacing: '0.04em' }}
                    >
                      {dim.label}
                    </span>
                  </div>
                  <StatusDot status={dim.status} />
                </div>

                <div className="pl-[52px] flex items-center gap-2">
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 border font-medium tracking-[0.15em]"
                    style={{
                      color:        isActive ? cfg.color : '#2A2A26',
                      borderColor:  isActive ? `${cfg.color}30` : 'rgba(255,255,255,0.04)',
                      backgroundColor: isActive ? `${cfg.color}08` : 'transparent',
                    }}
                  >
                    {dim.status}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Vertical divider */}
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
          className="absolute"
          style={{
            left:             'calc(clamp(48px,10vw,160px) + 340px - 1px)',
            top:              '17rem',
            bottom:           '7rem',
            width:            '1px',
            backgroundColor:  'rgba(255,255,255,0.06)',
          }}
        />

        {/* RIGHT — module detail */}
        <div className="pl-14 min-h-[380px]" style={{paddingLeft: '1rem'}}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              variants={rightPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col"
            >
              {/* Module label + status */}
              <div className="flex items-start justify-between mb-6">
                <h2
                  className="font-mono font-bold leading-tight"
                  style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: '#E8E8E0', letterSpacing: '-0.02em' }}
                >
                  {activeDim.label}
                </h2>
                <span
                  className="font-mono text-[10px] px-3 py-1.5 border mt-1 ml-4 flex-shrink-0 tracking-[0.18em]"
                  style={{
                    color:            STATUS_CFG[activeDim.status]?.color,
                    borderColor:      `${STATUS_CFG[activeDim.status]?.color}30`,
                    backgroundColor:  `${STATUS_CFG[activeDim.status]?.color}08`,
                  }}
                >
                  {activeDim.status}
                </span>
              </div>

              {/* Tagline */}
              <p
                className="font-mono mb-5"
                style={{ fontSize: '13px', color: '#00FF94', letterSpacing: '0.04em', opacity: 0.8 }}
              >
                {activeDim.tagline}
              </p>

              {/* Divider */}
              <div className="h-px mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />

              {/* Description */}
              <p
                className="font-sans mb-8 leading-relaxed"
                style={{ fontSize: '15px', color: '#4A4A44', maxWidth: '520px' }}
              >
                {activeDim.desc}
              </p>

              {/* Dynamic content per module */}
              {'stack' in activeDim && (
                <div className="mb-6" style={{marginTop: '1rem'}}>
                  <p className="font-bold text-[10px] tracking-[0.2em] mb-3" style={{ color: '#4A4A44' }}>
                    STACK
                  </p>
                  <div className="flex flex-wrap gap-2" style={{paddingBottom: '1rem'}}>
                    {(activeDim as typeof activeDim & { stack: string[] }).stack.map((tech: string) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-3 py-1 border"
                        style={{ color: '#4A4A44', borderColor: 'rgba(255,255,255,0.07)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {'builds' in activeDim && (
                <div>
                  <p className="font-bold text-[10px] tracking-[0.2em] mb-3" style={{ color: '#4A4A44' }}>
                    DELIVERABLES
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {(activeDim as typeof activeDim & { builds: string[] }).builds.map((item: string) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="font-mono text-xs" style={{ color: '#00FF94', opacity: 0.5 }}>→</span>
                        <span className="font-mono text-xs" style={{ color: '#4A4A44' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {'metrics' in activeDim && (
                <div className="flex gap-10 mb-6" style={{margin: '1rem 0'}}>
                  {Object.entries((activeDim as typeof activeDim & { metrics: Record<string, number | string> }).metrics).map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-1">
                      <span
                        className="font-mono font-bold"
                        style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#E8E8E0', letterSpacing: '-0.03em', lineHeight: 1 }}
                      >
                        {typeof v === 'number' ? v.toLocaleString() + '+' : v}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: '#4A4A44' }}>
                        {k}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {'formats' in activeDim && (
                <div style={{marginTop: '1rem'}}>
                  <p className="font-bold text-[10px] tracking-[0.2em] mb-3" style={{ color: '#4A4A44' }}>
                    FORMATS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(activeDim as typeof activeDim & { formats: string[] }).formats.map((f: string) => (
                      <span
                        key={f}
                        className="font-mono text-xs px-3 py-1 border"
                        style={{ color: '#4A4A44', borderColor: 'rgba(255,255,255,0.07)' }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBILE: accordion ─────────────────────────────── */}
      <motion.div
        className="flex flex-col gap-0 lg:hidden"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {IDENTITY.dimensions.map((dim) => {
          const isActive = dim.id === activeId
          const cfg = STATUS_CFG[dim.status] ?? STATUS_CFG.RUNNING
          return (
            <motion.div key={dim.id} variants={itemVariants} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <button
                onClick={() => setActiveId(isActive ? '' : dim.id)}
                className="w-full text-left py-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <StatusDot status={dim.status} />
                  <span className="font-mono text-sm font-medium" style={{ color: isActive ? '#E8E8E0' : '#4A4A44' }}>
                    {dim.label}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-lg"
                  style={{ color: cfg.color, lineHeight: 1 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 flex flex-col gap-5">
                      <p className="font-mono text-xs" style={{ color: cfg.color, opacity: 0.8 }}>{dim.tagline}</p>
                      <p className="font-sans text-sm leading-relaxed" style={{ color: '#4A4A44' }}>{dim.desc}</p>
                      {'stack' in dim && (
                        <div className="flex flex-wrap gap-2">
                          {(dim as typeof dim & { stack: string[] }).stack.map((t: string) => (
                            <span key={t} className="font-mono text-xs px-2.5 py-1 border" style={{ color: '#4A4A44', borderColor: 'rgba(255,255,255,0.07)' }}>{t}</span>
                          ))}
                        </div>
                      )}
                      {'formats' in dim && (
                        <div className="flex flex-wrap gap-2">
                          {(dim as typeof dim & { formats: string[] }).formats.map((f: string) => (
                            <span key={f} className="font-mono text-xs px-2.5 py-1 border" style={{ color: '#4A4A44', borderColor: 'rgba(255,255,255,0.07)' }}>{f}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>

    </section>
  )
}
