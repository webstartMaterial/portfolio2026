'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Capability cards ───────────────────────────────────────
const CAPABILITIES = [
  {
    id:    '01',
    key:   'web_platforms',
    label: 'Web Platforms',
    color: '#00FF94',
    desc:  'Modern websites, landing pages, SaaS interfaces and business platforms built for performance and scale.',
    stack: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind'],
  },
  {
    id:    '02',
    key:   'mobile_apps',
    label: 'Mobile Applications',
    color: '#4A9EFF',
    desc:  'Mobile-first experiences, responsive applications and connected interfaces across all devices.',
    stack: ['React Native', 'APIs', 'Firebase', 'Supabase'],
  },
  {
    id:    '03',
    key:   'custom_software',
    label: 'Custom Software',
    color: '#FFB800',
    desc:  'Internal tools, dashboards, LMS platforms, booking systems and workflow automations on demand.',
    stack: ['Symfony', 'PHP', 'Python', 'PostgreSQL', 'APIs'],
  },
  {
    id:    '04',
    key:   'enterprise_systems',
    label: 'Enterprise Systems',
    color: '#00D4FF',
    desc:  'Robust back-end architectures, CRM integrations, scalable systems and complex business logic.',
    stack: ['Java', 'Spring Boot', 'Node.js', 'SQL', 'CI/CD'],
  },
]

const CONTEXTS = ['Startups', 'ESNs', 'Web Agencies', 'Tech Companies', 'Client Projects']

// ── Engineering grid background ────────────────────────────
function EngineeringGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: [
          'linear-gradient(rgba(0,255,148,0.022) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,255,148,0.022) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

// ── Capability card ────────────────────────────────────────
function CapabilityCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        borderTop:    '1px solid rgba(255,255,255,0.07)',
        borderRight:  '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        borderLeft:   `2px solid ${hovered ? cap.color : cap.color + '40'}`,
        padding: '28px 24px 24px',
        transition: 'background-color 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.25s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 12px 40px ${cap.color}12, inset 0 0 40px ${cap.color}05`
          : 'none',
        cursor: 'default',
      }}
    >
      {/* Code notation */}
      <span
        className="font-mono"
        style={{
          fontSize: '9px',
          color: cap.color,
          opacity: hovered ? 0.7 : 0.35,
          letterSpacing: '0.18em',
          display: 'block',
          marginBottom: '10px',
          transition: 'opacity 0.25s',
        }}
      >
        // {cap.key}
      </span>

      {/* Module label */}
      <p
        className="font-mono"
        style={{
          fontSize: '13px',
          color: hovered ? '#E8E8E0' : '#C8C8C0',
          fontWeight: 700,
          letterSpacing: '0.04em',
          marginBottom: '12px',
          lineHeight: 1.2,
          transition: 'color 0.25s',
        }}
      >
        {cap.label}
      </p>

      {/* Description */}
      <p
        className="font-sans"
        style={{
          fontSize: '12px',
          color: '#ffffff',
          lineHeight: 1.65,
          marginBottom: '20px',
        }}
      >
        {cap.desc}
      </p>

      {/* Tech tags — always visible, glow on hover */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {cap.stack.map(tech => (
          <span
            key={tech}
            className="font-mono"
            style={{
              fontSize: '9px',
              color:            hovered ? cap.color        : '#ffffff',
              border:           `1px solid ${hovered ? cap.color + '40' : 'rgba(255,255,255,0.2)'}`,
              backgroundColor:  hovered ? cap.color + '0A' : 'transparent',
              padding: '3px 8px',
              letterSpacing: '0.1em',
              transition: 'color 0.25s, border-color 0.25s, background-color 0.25s',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// ── Section label strip ────────────────────────────────────
function SectionStrip({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative', zIndex: 1, marginBottom: '64px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="font-mono" style={{ fontSize: '11px', color: '#3A3A36', letterSpacing: '0.25em' }}>//</span>
        <span
          className="font-mono"
          style={{ fontSize: '11px', color: '#ffffff', letterSpacing: '0.25em', fontWeight: 500, textTransform: 'uppercase' }}
        >
          04 · DEV
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: '9px',
            color: '#00FF94',
            border: '1px solid rgba(0,255,148,0.25)',
            backgroundColor: 'rgba(0,255,148,0.06)',
            padding: '2px 8px',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          DEPLOYED
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
      </div>
    </motion.div>
  )
}

// ── Main export ─────────────────────────────────────────────
export function FullStack() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="dev"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#050505',
        paddingTop:    'clamp(80px,9vw,144px)',
        paddingBottom: 'clamp(80px,9vw,144px)',
        paddingLeft:   'clamp(48px,10vw,160px)',
        paddingRight:  'clamp(48px,10vw,160px)',
        overflow: 'hidden',
      }}
    >
      <EngineeringGrid />

      {/* Decorative watermark number */}
      <div
        aria-hidden
        className="font-mono font-bold hidden lg:block"
        style={{
          position: 'absolute',
          right: '0',
          bottom: 'clamp(80px,9vw,144px)',
          fontSize: 'clamp(160px,18vw,260px)',
          lineHeight: 1,
          color: 'rgba(0,255,148,0.022)',
          letterSpacing: '-0.05em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        04
      </div>

      <SectionStrip inView={inView} />

      {/* ── DESKTOP: split panel ──────────────────────────── */}
      <div
        className="hidden lg:flex"
        style={{ gap: '72px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}
      >
        {/* LEFT — text column */}
        <div style={{ width: '360px', flexShrink: 0 }}>

          {/* Title */}
          <motion.h2
            className="font-mono font-bold"
            style={{
              fontSize: 'clamp(34px, 3.8vw, 56px)',
              color: '#E8E8E0',
              letterSpacing: '-0.025em',
              lineHeight: 1.0,
              marginBottom: '28px',
            }}
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          >
            FULL STACK<br />
            <span style={{ color: '#00FF94' }}>DEVELOPER</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="font-sans"
            style={{
              fontSize: '14px',
              color: '#ffffff',
              lineHeight: 1.8,
              marginBottom: '36px',
              maxWidth: '320px',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
          >
            I build complete digital systems — from modern websites and mobile apps to dashboards, platforms, APIs and custom business software.
          </motion.p>

          {/* // worked across label */}
          <motion.p
            className="font-mono"
            style={{ fontSize: '10px', color: '#ffffff', letterSpacing: '0.15em', marginBottom: '12px' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.28, duration: 0.4 }}
          >
            // worked across
          </motion.p>

          {/* Context chips */}
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.33, duration: 0.5, ease: EASE }}
          >
            {CONTEXTS.map(ctx => (
              <span
                key={ctx}
                className="font-mono"
                style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '4px 10px',
                  letterSpacing: '0.08em',
                }}
              >
                {ctx}
              </span>
            ))}
          </motion.div>

          {/* Connector line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.52, duration: 0.9, ease: EASE }}
            style={{
              width: '1px',
              height: '56px',
              backgroundColor: 'rgba(0,255,148,0.18)',
              marginTop: '44px',
            }}
          />

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.72, duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}
          >
            {/* Pulsing dot */}
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px', flexShrink: 0 }}>
              <motion.span
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#00FF94',
                  opacity: 0.25,
                }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.25, 0, 0.25] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              />
              <span style={{ position: 'relative', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00FF94' }} />
            </span>
            <span className="font-mono" style={{ fontSize: '10px', color: '#ffffff', letterSpacing: '0.15em' }}>
              SYSTEM · OPERATIONAL
            </span>
          </motion.div>
        </div>

        {/* RIGHT — 2×2 card grid */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            backgroundColor: 'rgba(255,255,255,0.04)',
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </div>

      {/* ── MOBILE: stacked ───────────────────────────────── */}
      <div
        className="flex flex-col lg:hidden"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.h2
          className="font-mono font-bold"
          style={{
            fontSize: 'clamp(32px, 9vw, 48px)',
            color: '#E8E8E0',
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            marginBottom: '20px',
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
        >
          FULL STACK<br />
          <span style={{ color: '#00FF94' }}>DEVELOPER</span>
        </motion.h2>

        <motion.p
          className="font-sans"
          style={{ fontSize: '14px', color: '#ffffff', lineHeight: 1.75, marginBottom: '24px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          I build complete digital systems — from modern websites and mobile apps to dashboards, platforms, APIs and custom business software.
        </motion.p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '32px' }}>
          {CONTEXTS.map(ctx => (
            <span key={ctx} className="font-mono" style={{ fontSize: '10px', color: '#ffffff', border: '1px solid rgba(255,255,255,0.07)', padding: '4px 10px', letterSpacing: '0.08em' }}>
              {ctx}
            </span>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            backgroundColor: 'rgba(255,255,255,0.04)',
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
