'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── CountUp ────────────────────────────────────────────────
function CountUp({
  to,
  duration = 2,
  delay    = 0,
  suffix   = '',
  start,
}: {
  to:        number
  duration?: number
  delay?:    number
  suffix?:   string
  start:     boolean
}) {
  const count   = useMotionValue(0)
  const display = useTransform(count, (v) => {
    const n = Math.round(v)
    return n >= 1000 ? (n / 1000).toFixed(0) + ' 000' + suffix : n + suffix
  })

  useEffect(() => {
    if (!start) return
    const ctrl = animate(count, to, { duration, delay, ease: 'easeOut' })
    return ctrl.stop
  }, [start, to, duration, delay, count])

  return <motion.span>{display}</motion.span>
}

// ── Metric card ────────────────────────────────────────────
const METRICS = [
  { value: 5000, suffix: '+', label: 'Learners Trained',       color: '#00FF94', duration: 2.2, delay: 0    },
  { value: 10,   suffix: '',  label: 'Years of Experience',    color: '#E8E8E0', duration: 1.4, delay: 0.15 },
  { value: 4,    suffix: '',  label: 'Teaching Formats',       color: '#E8E8E0', duration: 0.8, delay: 0.3  },
  { value: 20,   suffix: '+', label: 'Projects Delivered',     color: '#4A9EFF', duration: 1.6, delay: 0.45 },
  { value: 4,    suffix: '',  label: 'Expertise Pillars',      color: '#FFB800', duration: 0.6, delay: 0.6  },
  { value: 40,   suffix: '+', label: 'Technologies Mastered',  color: '#00FF94', duration: 1.2, delay: 0.75 },
] as const

function MetricCard({
  metric,
  start,
}: {
  metric: typeof METRICS[number]
  start:  boolean
}) {
  return (
    <div
      style={{
        display:        'flex',
        flexDirection:  'column',
        gap:            '0',
        padding:        'clamp(28px,3.5vw,48px) clamp(28px,3.5vw,52px)',
        position:       'relative',
        borderRight:    '1px solid rgba(255,255,255,0.04)',
        borderBottom:   '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Value */}
      <div
        className="font-mono font-bold"
        style={{
          fontSize:      'clamp(44px,6.5vw,80px)',
          color:         metric.color,
          letterSpacing: '-0.05em',
          lineHeight:    1,
          marginBottom:  '10px',
        }}
      >
        <CountUp
          to={metric.value}
          suffix={metric.suffix}
          duration={metric.duration}
          delay={metric.delay}
          start={start}
        />
      </div>

      {/* Label */}
      <span
        className="font-mono"
        style={{
          fontSize:      '10px',
          color:         '#ffffff',
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          marginBottom:  '16px',
        }}
      >
        {metric.label}
      </span>

      {/* Progress bar */}
      <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', backgroundColor: metric.color, transformOrigin: '0% 50%' }}
          initial={{ scaleX: 0 }}
          animate={start ? { scaleX: 1 } : {}}
          transition={{ delay: metric.delay + 0.3, duration: metric.duration * 0.6, ease: EASE }}
        />
      </div>
    </div>
  )
}

// ── Main section ───────────────────────────────────────────
export function Metrics() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })
  const gridInView = useInView(gridRef,    { once: true, margin: '-40px' })

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="relative w-full py-36 overflow-hidden"
      style={{
        backgroundColor: '#050505',
        paddingTop: 'clamp(40px,4.5vw,72px)',
        paddingBottom: 'clamp(40px,4.5vw,72px)',
      }}
    >
      {/* ── Dot grid background ──────────────────────────── */}
      <div
        aria-hidden
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
          pointerEvents:   'none',
        }}
      />

      <div style={{ paddingLeft: 'clamp(48px,10vw,160px)', paddingRight: 'clamp(48px,10vw,160px)', position: 'relative' }}>

        {/* ── Section header ───────────────────────────── */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs" style={{ color: '#3A3A36', letterSpacing: '0.25em' }}>//</span>
          <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase" style={{ color: '#3A3A36' }}>
            08 · METRICS
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span
            className="font-mono text-[9px] px-3 py-1 tracking-[0.2em]"
            style={{ color: '#00FF94', border: '1px solid rgba(0,255,148,0.2)', backgroundColor: 'rgba(0,255,148,0.06)' }}
          >
            COMPILED
          </span>
        </motion.div>

        {/* ── Headline ─────────────────────────────────── */}
        <motion.p
          className="font-mono mb-16"
          style={{ fontSize: 'clamp(22px,3vw,38px)', color: '#E8E8E0', letterSpacing: '-0.02em', maxWidth: '600px' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
        >
          System report.
        </motion.p>

        {/* ── Metrics grid ─────────────────────────────── */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border:              '1px solid rgba(255,255,255,0.06)',
            backgroundColor:     '#080808',
            marginBottom:        '56px',
            position:            'relative',
            overflow:            'hidden',
          }}
        >
          {/* Top scan line */}
          <motion.div
            style={{
              position:        'absolute',
              top:             0,
              left:            0,
              right:           0,
              height:          '1px',
              background:      'linear-gradient(90deg, transparent 0%, #00FF94 50%, transparent 100%)',
              opacity:         0.5,
            }}
            initial={{ scaleX: 0, originX: '0%' }}
            animate={gridInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.1, duration: 1, ease: EASE }}
          />

          {METRICS.map((metric) => (
            <MetricCard key={metric.label} metric={metric} start={gridInView} />
          ))}
        </motion.div>

        {/* ── Baseline ─────────────────────────────────── */}
        <motion.div
          className="flex items-start gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.55, ease: EASE }}
        >
          <div
            style={{
              width:           '2px',
              minHeight:       '48px',
              backgroundColor: '#00FF94',
              opacity:         0.35,
              flexShrink:      0,
              marginTop:       '4px',
            }}
          />
          <div className="flex flex-col gap-2">
            <p
              className="font-sans"
              style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: '#E8E8E0', lineHeight: 1.5 }}
            >
              AI · Dev · Instructor · Content Creator.
              <br />
              <span style={{ color: '#ffffff' }}>One profile, four active dimensions.</span>
            </p>
            <div className="flex items-center gap-3 flex-wrap mt-1">
              {(['AI', 'DEV', 'FORMATION', 'CONTENT_CONTENT'] as const).map((tag) => {
                const colors: Record<string, string> = {AI: '#FF4D4D', DEV: '#00FF94', FORMATION: '#4A9EFF', CONTENT_CONTENT: '#FFB800' }
                const c = colors[tag]
                return (
                  <span
                    key={tag}
                    className="font-mono"
                    style={{
                      fontSize:        '9px',
                      color:           c,
                      letterSpacing:   '0.2em',
                      padding:         '3px 9px',
                      border:          `1px solid ${c}28`,
                      backgroundColor: `${c}08`,
                    }}
                  >
                    {tag}
                  </span>
                )
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
