'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ParticleField } from '@/components/ui/ParticleField'
import { useTypewriter } from '@/lib/hooks'
import { HERO } from '@/data/portfolio'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Single character reveal ───────────────────────────────
function Char({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.06, ease: 'linear' }}
      className="inline-block"
    >
      {char === ' ' ? ' ' : char}
    </motion.span>
  )
}

const STATUS_COLOR: Record<string, string> = {
  STATUS:  '#00FF94',
  default: '#ffffff',
}

// ── Full-bleed portrait panel ─────────────────────────────
function PortraitPanel({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="hidden lg:block"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ delay: 0.3, duration: 1.1, ease: EASE }}
      style={{
        position: 'absolute',
        top:      0,
        right:    0,
        width:    '47%',
        height:   '100%',
        zIndex:   1,
      }}
    >
      {/* Next.js Image — fill parent */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src="/samih.jpg"
          alt="Samih Habbani"
          fill
          priority
          sizes="47vw"
          style={{
            objectFit:      'cover',
            objectPosition: 'center top',
            filter:         'grayscale(100%) contrast(1.1) brightness(0.65)',
          }}
        />
      </div>

      {/* Green chromatic tint */}
      <div
        style={{
          position:        'absolute',
          inset:           0,
          backgroundColor: 'rgba(0,255,148,0.06)',
          mixBlendMode:    'screen' as const,
          pointerEvents:   'none',
          zIndex:           2,
        }}
      />

      {/* Horizontal scan lines */}
      <div
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.22) 2px, rgba(0,0,0,0.22) 3px)',
          pointerEvents:   'none',
          zIndex:           3,
        }}
      />

      {/* Left-edge fade — blends photo into background */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to right, #050505 0%, rgba(5,5,5,0.82) 12%, rgba(5,5,5,0.3) 32%, transparent 58%)',
          zIndex:      4,
          pointerEvents: 'none',
        }}
      />

      {/* Top-edge fade */}
      <div
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          right:         0,
          height:        '15%',
          background:    'linear-gradient(to bottom, #050505 0%, transparent 100%)',
          zIndex:         4,
          pointerEvents: 'none',
        }}
      />

      {/* Bottom-edge fade */}
      <div
        style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          height:        '28%',
          background:    'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.7) 40%, transparent 100%)',
          zIndex:         4,
          pointerEvents: 'none',
        }}
      />

      {/* Animated scan sweep */}
      <motion.div
        style={{
          position:      'absolute',
          left:          0,
          right:         0,
          height:        '2px',
          background:    'linear-gradient(90deg, transparent 0%, rgba(0,255,148,0.22) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex:         5,
        }}
        animate={{ top: ['-2%', '102%'] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear', repeatDelay: 3 }}
      />

      {/* TUI bracket — top-right corner */}
      <div
        style={{
          position:    'absolute',
          top:         '24px',
          right:       '24px',
          width:       '18px',
          height:      '18px',
          borderTop:   '1px solid rgba(0,255,148,0.3)',
          borderRight: '1px solid rgba(0,255,148,0.3)',
          zIndex:       6,
        }}
      />

      {/* TUI bracket — bottom-right corner */}
      <div
        style={{
          position:       'absolute',
          bottom:         '24px',
          right:          '24px',
          width:          '18px',
          height:         '18px',
          borderBottom:   '1px solid rgba(0,255,148,0.3)',
          borderRight:    '1px solid rgba(0,255,148,0.3)',
          zIndex:          6,
        }}
      />

      {/* Meta readout — bottom right */}
      <div
        style={{
          position:      'absolute',
          bottom:        '36px',
          right:         '52px',
          zIndex:         7,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'flex-end',
          gap:           '5px',
        }}
      >
        {Object.entries(HERO.meta).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="font-mono uppercase"
              style={{ fontSize: '8px', letterSpacing: '0.18em', color: STATUS_COLOR[key] ?? 'rgba(255,255,255)' }}
            >
              {value}
            </span>
            <span className="font-mono" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.15)' }}>──·</span>
            <span
              className="font-mono uppercase"
              style={{ fontSize: '8px', letterSpacing: '0.18em', color: 'rgb(255, 255, 255)', width: '52px', textAlign: 'right' }}
            >
              {key}
            </span>
          </div>
        ))}
        {/* ID line */}
        <div style={{ marginTop: '4px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span className="font-mono" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.2em' }}>
            ID · SAMIH_HABBANI
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Hero ──────────────────────────────────────────────
export function Hero() {
  const [phase, setPhase]   = useState(0)
  const containerRef        = useRef<HTMLDivElement>(null)

  // Mouse parallax
  const rawX  = useMotionValue(0)
  const rawY  = useMotionValue(0)
  const nameX = useSpring(useTransform(rawX, [-0.5, 0.5], [-9,  9]), { stiffness: 55, damping: 22 })
  const nameY = useSpring(useTransform(rawY, [-0.5, 0.5], [-5,  5]), { stiffness: 55, damping: 22 })

  // Typewriter prompt
  const { displayText: promptText, isDone: promptDone } = useTypewriter(
    HERO.prompt,
    {
      speed:      32,
      delay:      500,
      enabled:    phase >= 1,
      onComplete: () => setTimeout(() => setPhase(2), 280),
    }
  )

  // Phase sequencer
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 2) t = setTimeout(() => setPhase(3), 1050)
    if (phase === 3) t = setTimeout(() => setPhase(4), 1150)
    if (phase === 4) t = setTimeout(() => setPhase(5), 700)
    return () => clearTimeout(t!)
  }, [phase])

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const onMouseLeave = () => { rawX.set(0); rawY.set(0) }

  const CHAR_DELAY     = 0.062
  const first          = HERO.name.first.split('')
  const last           = HERO.name.last.split('')
  const lastStartDelay = (first.length + 0.6) * CHAR_DELAY

  return (
    <section
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full min-h-svh overflow-hidden"
    >
      {/* Particle field */}
      <div className="absolute inset-0 z-0">
        <ParticleField count={36} />
      </div>

      {/* Full-bleed portrait panel (lg+, behind text) */}
      <PortraitPanel visible={phase >= 4} />

      {/* ── Text content ─────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col justify-center min-h-svh py-28 lg:max-w-[58%]"
        style={{
          paddingLeft:  'clamp(48px, 10vw, 160px)',
          paddingRight: 'clamp(48px, 10vw, 160px)',
        }}
      >
        {/* Prompt */}
        <div className="mb-10 h-5 flex items-center">
          {phase >= 1 && (
            <p className="font-mono text-xs tracking-wider" style={{ color: '#3A3A36' }}>
              {promptText}
              {!promptDone && (
                <span
                  className="inline-block w-[6px] h-[12px] ml-0.5 align-middle cursor-blink"
                  style={{ backgroundColor: '#00FF94' }}
                />
              )}
            </p>
          )}
        </div>

        {/* Name */}
        <motion.div style={{ x: nameX, y: nameY }}>
          <h1
            className="font-mono font-bold leading-none select-none"
            style={{
              fontSize:      'clamp(64px, 9vw, 118px)',
              letterSpacing: '-0.03em',
              color:         '#E8E8E0',
            }}
          >
            <div>
              {phase >= 2 && first.map((char, i) => (
                <Char key={i} char={char} delay={i * CHAR_DELAY} />
              ))}
            </div>
            <div className="flex items-end">
              {phase >= 2 && last.map((char, i) => (
                <Char key={i} char={char} delay={lastStartDelay + i * CHAR_DELAY} />
              ))}
              {phase === 2 && (
                <motion.span
                  className="inline-block ml-1"
                  style={{
                    width:           '0.48em',
                    height:          '0.82em',
                    backgroundColor: '#00FF94',
                    marginBottom:    '0.05em',
                  }}
                />
              )}
            </div>
          </h1>
        </motion.div>

        {/* Pillars — the three inputs */}
        <div className="mt-9 flex flex-col gap-2">
          {HERO.pillars.map((pillar, i) => (
            <motion.div
              key={pillar}
              initial={{ opacity: 0, x: -14 }}
              animate={phase >= 3 ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255, 0.8)' }}>{'·'}</span>
              <span
                className="font-mono"
                style={{
                  fontSize:      'clamp(11px, 1.1vw, 13px)',
                  color:         'rgba(255,255,255, 0.8)',
                  letterSpacing: '0.08em',
                }}
              >
                {pillar}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Convergence arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-4 mb-4 flex items-center gap-3"
          style={{ maxWidth: '320px' }}
        >
          <div className="h-px flex-1" style={{ background: 'rgba(0,255,148,0.15)' }} />
          <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(0,255,148,0.4)', letterSpacing: '0.2em', paddingBottom: '1rem', paddingTop: '1rem' }}>
            CONVERGE
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(0,255,148,0.15)' }} />
        </motion.div>

        {/* Primary identity — the output */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono" style={{ fontSize: 'clamp(11px, 1.1vw, 13px)', color: '#00FF94' }}>{'>>'}</span>
            <span
              className="font-mono font-bold"
              style={{
                fontSize:      'clamp(16px, 1.7vw, 22px)',
                color:         '#E8E8E0',
                letterSpacing: '-0.01em',
              }}
            >
              {HERO.identity.title}
            </span>
          </div>
          <p
            className="font-sans"
            style={{
              fontSize:      'clamp(12px, 1.1vw, 14px)',
              color:         '#ffffff',
              fontWeight: 'bold',
              letterSpacing: '0.01em',
              lineHeight:    1.6,
              paddingLeft:   '28px',
              paddingBottom: '1rem'
            }}
          >
            {HERO.identity.tagline}
          </p>
        </motion.div>

        {/* Divider */}
        <div className="mt-9 mb-8" style={{ maxWidth: '400px' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={phase >= 4 ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px origin-left"
            style={{ backgroundColor: '#00FF94', opacity: 0.35 }}
          />
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 flex-wrap"
        >
          <button
            className="font-mono font-bold tracking-[0.14em] uppercase transition-all duration-200"
            style={{
              fontSize:        '11px',
              padding:         '13px 26px',
              backgroundColor: '#00FF94',
              color:           '#050505',
              border:          '1px solid #00FF94',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#00FF94'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#00FF94'
              e.currentTarget.style.color = '#050505'
            }}
          >
            {HERO.cta.primary}
          </button>

          <button
            className="font-mono font-medium tracking-[0.14em] uppercase transition-all duration-200"
            style={{
              fontSize:   '11px',
              padding:    '13px 26px',
              color:      '#ffffff',
              border:     '1px solid rgba(255,255,255,0.09)',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color       = '#E8E8E0'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color       = '#ffffff'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
            }}
          >
            {HERO.cta.secondary}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase >= 5 ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-mono uppercase" style={{ fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.8)' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
