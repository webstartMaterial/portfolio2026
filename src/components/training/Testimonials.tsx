'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { REVIEWS, REVIEWS_SUMMARY } from '@/data/training'
import { IconStar, IconQuote } from './Icons'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function CountUp({ to, decimals = 0, duration = 1.6, start }: { to: number; decimals?: number; duration?: number; start: boolean }) {
  const count   = useMotionValue(0)
  const display = useTransform(count, v => v.toFixed(decimals))

  useEffect(() => {
    if (!start) return
    const ctrl = animate(count, to, { duration, ease: 'easeOut' })
    return ctrl.stop
  }, [start, to, duration, count])

  return <motion.span>{display}</motion.span>
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center" style={{ gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <IconStar key={i} size={size} color={i <= rating ? '#00D4FF' : 'rgba(255,255,255,0.15)'} />
      ))}
    </div>
  )
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full"
      style={{
        paddingTop:      'clamp(48px,6vw,88px)',
        paddingBottom:   'clamp(48px,6vw,88px)',
        paddingLeft:     'clamp(24px,10vw,160px)',
        paddingRight:    'clamp(24px,10vw,160px)',
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
        <IconStar size={16} color="#00D4FF" />
        <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase" style={{ color: '#00D4FF' }}>
          04 · STUDENT REVIEWS
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(0,212,255,0.3)' }} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
        className="font-mono font-bold"
        style={{ fontSize: 'clamp(32px,4.5vw,64px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#E8E8E0', marginBottom: '40px' }}
      >
        NOT MY WORDS.
        <br />
        <span style={{ color: '#00D4FF' }}>THEIRS.</span>
      </motion.h2>

      {/* Rating strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
        className="flex flex-wrap items-center gap-6"
        style={{ border: '1px solid rgba(0,212,255,0.15)', backgroundColor: '#0A0A0A', padding: 'clamp(20px,2.5vw,28px) clamp(20px,3vw,36px)', marginBottom: '32px' }}
      >
        <div className="flex items-baseline" style={{ gap: '4px' }}>
          <span className="font-mono font-bold" style={{ fontSize: 'clamp(44px,6vw,72px)', color: '#00D4FF', letterSpacing: '-0.03em' }}>
            <CountUp to={REVIEWS_SUMMARY.rating} decimals={1} start={inView} />
          </span>
          <span className="font-mono" style={{ fontSize: '20px', color: 'rgba(255,255,255,0.35)' }}>/5</span>
        </div>

        <div className="flex flex-col" style={{ gap: '8px' }}>
          <Stars rating={5} size={16} />
          <span className="font-mono text-[11px]" style={{ color: '#ffffff', opacity: 0.6, letterSpacing: '0.05em' }}>
            Based on <span style={{ color: '#E8E8E0' }}><CountUp to={REVIEWS_SUMMARY.count} start={inView} /></span> {REVIEWS_SUMMARY.source} — Académie WS
          </span>
        </div>

        <a
          href={REVIEWS_SUMMARY.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] font-bold"
          style={{ color: '#00D4FF', letterSpacing: '0.1em', marginLeft: 'auto', whiteSpace: 'nowrap' }}
        >
          READ ALL REVIEWS ↗
        </a>
      </motion.div>

      {/* Quote cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
        {REVIEWS.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 + i * 0.08, duration: 0.55, ease: EASE }}
            style={{ backgroundColor: '#0A0A0A', padding: 'clamp(22px,2.8vw,32px)', display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div className="flex items-center justify-between">
              <IconQuote size={24} color="#00D4FF" />
              <Stars rating={r.rating} />
            </div>

            <p className="font-sans" style={{ fontSize: '13.5px', lineHeight: 1.75, color: '#ffffff', opacity: 0.85, flex: 1 }}>
              {r.quote}
            </p>

            {r.reply && (
              <div style={{ borderLeft: '2px solid rgba(0,212,255,0.3)', paddingLeft: '12px' }}>
                <p className="font-mono text-[10px] font-semibold" style={{ color: '#00D4FF', opacity: 0.8, marginBottom: '2px', letterSpacing: '0.05em' }}>
                  RÉPONSE DE SAMIH
                </p>
                <p className="font-sans text-[12px]" style={{ color: '#ffffff', opacity: 0.6 }}>{r.reply}</p>
              </div>
            )}

            <div className="flex items-center justify-between" style={{ paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <p className="font-mono font-semibold" style={{ fontSize: '12px', color: '#E8E8E0' }}>{r.name}</p>
                <p className="font-mono text-[10px]" style={{ color: '#ffffff', opacity: 0.45 }}>
                  {r.course ? `${r.course} · ` : ''}{r.date}
                </p>
              </div>
              <span className="font-mono text-[9px]" style={{ color: '#ffffff', opacity: 0.35, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                GOOGLE AVIS
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
