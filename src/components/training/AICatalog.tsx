'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { AI_TRACKS, ROLE_BASED_PROGRAMS, type Course } from '@/data/training'
import { IconBrain } from './Icons'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function CourseCard({ course, color, index, inView }: { course: Course; color: string; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE }}
      style={{ backgroundColor: '#0A0A0A', border: `1px solid ${open ? `${color}40` : 'rgba(255,255,255,0.07)'}`, transition: 'border-color 0.2s' }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left"
        style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer', background: 'none', border: 'none' }}
      >
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-mono font-semibold" style={{ fontSize: '15px', color: '#E8E8E0', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
            {course.title}
          </h4>
          <span
            className="font-mono text-[9px] flex-shrink-0"
            style={{ color, border: `1px solid ${color}30`, backgroundColor: `${color}0C`, padding: '4px 8px', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
          >
            {course.duration}
          </span>
        </div>
        <p className="font-mono text-[10px]" style={{ color, opacity: 0.8, letterSpacing: '0.1em' }}>
          {course.level.toUpperCase()}
        </p>
        <p className="font-sans" style={{ fontSize: '12px', color: '#ffffff', opacity: 0.75, lineHeight: 1.55 }}>
          {course.desc}
        </p>
        <span className="font-mono text-[10px]" style={{ color, opacity: 0.9, marginTop: '4px' }}>
          {open ? '− HIDE DETAILS' : '+ VIEW PROGRAM DETAILS'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px' }}>
                <div>
                  <p className="font-mono text-[9px]" style={{ color: '#ffffff', opacity: 0.45, letterSpacing: '0.12em', marginBottom: '3px' }}>AUDIENCE</p>
                  <p className="font-sans" style={{ color: '#C8C8C0', lineHeight: 1.5 }}>{course.audience}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px]" style={{ color: '#ffffff', opacity: 0.45, letterSpacing: '0.12em', marginBottom: '3px' }}>FORMAT</p>
                  <p className="font-sans" style={{ color: '#C8C8C0', lineHeight: 1.5 }}>{course.format}</p>
                </div>
              </div>

              <div>
                <p className="font-mono text-[9px]" style={{ color: '#ffffff', opacity: 0.45, letterSpacing: '0.12em', marginBottom: '6px' }}>LEARNING OUTCOMES</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {course.outcomes.map(o => (
                    <li key={o} className="font-sans" style={{ fontSize: '12px', color: '#ffffff', lineHeight: 1.55, display: 'flex', gap: '8px' }}>
                      <span style={{ color, opacity: 0.6, flexShrink: 0 }}>→</span>{o}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[9px]" style={{ color: '#ffffff', opacity: 0.45, letterSpacing: '0.12em', marginBottom: '6px' }}>KEY MODULES</p>
                <p className="font-sans" style={{ fontSize: '11px', color: '#ffffff', opacity: 0.75, lineHeight: 1.6 }}>{course.modules.join(' · ')}</p>
              </div>

              <div>
                <p className="font-mono text-[9px]" style={{ color: '#ffffff', opacity: 0.45, letterSpacing: '0.12em', marginBottom: '6px' }}>HANDS-ON COMPONENT</p>
                <p className="font-sans" style={{ fontSize: '12px', color: '#ffffff', lineHeight: 1.6 }}>{course.handsOn}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {course.tools.map(t => (
                  <span key={t} className="font-mono text-[10px]" style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.12)', padding: '3px 9px' }}>
                    {t}
                  </span>
                ))}
              </div>

              {course.prerequisites && (
                <p className="font-sans text-[11px]" style={{ color: '#ffffff', opacity: 0.55 }}>
                  <strong style={{ color: '#ffffff', opacity: 0.85 }}>Prerequisites:</strong> {course.prerequisites}
                </p>
              )}
              <p className="font-sans text-[11px]" style={{ color: '#ffffff', opacity: 0.55, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                <strong style={{ color: '#ffffff', opacity: 0.85 }}>Customization:</strong> {course.customization}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export function AICatalog() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })
  const [activeTrack, setActiveTrack] = useState(AI_TRACKS[0].id)

  const track = AI_TRACKS.find(t => t.id === activeTrack)!

  return (
    <section
      id="ai-catalog"
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
        style={{ marginBottom: '24px' }}
      >
        <IconBrain size={16} />
        <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase" style={{ color: '#00FF94' }}>
          01 · AI BUSINESS TRAINING CATALOGUE
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(0,255,148,0.3)' }} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
        className="font-mono font-bold"
        style={{ fontSize: 'clamp(32px,4.5vw,64px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#E8E8E0', marginBottom: '20px' }}
      >
        9 CORE PROGRAMS
        <br />
        <span style={{ color: '#00FF94' }}>FOUR LEARNING TRACKS</span>
      </motion.h2>
      <p className="font-sans" style={{ fontSize: '13px', color: '#ffffff', opacity: 0.6, maxWidth: '600px', marginBottom: '32px', lineHeight: 1.6 }}>
        Click any program to see its full outline. Business Teams programs are refined and ready to deliver;
        Finance, Developers and Governance programs are offers I&apos;m preparing and testing ahead of commercialization.
      </p>

      {/* Track selector */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: '28px' }}>
        {AI_TRACKS.map(t => {
          const isActive = t.id === activeTrack
          return (
            <button
              key={t.id}
              onClick={() => setActiveTrack(t.id)}
              className="font-mono text-[11px] font-semibold"
              style={{
                padding: '10px 16px',
                letterSpacing: '0.06em',
                border: `1px solid ${isActive ? t.color : 'rgba(255,255,255,0.1)'}`,
                color: isActive ? t.color : '#ffffff',
                backgroundColor: isActive ? `${t.color}0C` : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.label} <span style={{ opacity: 0.5 }}>({t.courses.length})</span>
            </button>
          )
        })}
      </div>

      <div
        key={activeTrack}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}
      >
        {track.courses.map((course, i) => (
          <CourseCard key={course.id} course={course} color={track.color} index={i} inView={inView} />
        ))}
      </div>

      {/* Role-based programs — compact chips */}
      <div style={{ marginTop: '56px' }}>
        <p className="font-mono text-[10px] font-semibold" style={{ color: '#ffffff', letterSpacing: '0.18em', marginBottom: '8px' }}>
          ROLE-BASED VARIANTS
        </p>
        <p className="font-sans" style={{ fontSize: '12px', color: '#ffffff', opacity: 0.55, maxWidth: '600px', marginBottom: '18px', lineHeight: 1.6 }}>
          Every program above can be tailored to a function. Green = prior delivery experience, blue = customizable variant.
        </p>
        <div className="flex flex-wrap gap-2">
          {ROLE_BASED_PROGRAMS.map(p => (
            <span
              key={p.title}
              className="font-mono text-[11px]"
              title={p.desc}
              style={{
                color: p.verified ? '#00FF94' : '#4A9EFF',
                border: `1px solid ${p.verified ? 'rgba(0,255,148,0.3)' : 'rgba(74,158,255,0.3)'}`,
                backgroundColor: p.verified ? 'rgba(0,255,148,0.05)' : 'rgba(74,158,255,0.05)',
                padding: '7px 13px',
              }}
            >
              {p.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
