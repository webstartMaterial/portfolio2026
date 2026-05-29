'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Phase pipeline data ────────────────────────────────────
const PHASES = [
  {
    id:    '01',
    label: 'UNDERSTAND',
    color: '#4A9EFF',
    items: ['Field research', 'Business gap analysis', 'Process & data mapping', 'ROI identification'],
  },
  {
    id:    '02',
    label: 'BUILD',
    color: '#00D4FF',
    items: ['AI agents & pipelines', 'Full-stack development', 'RAG & LLM architecture', 'Custom automations'],
  },
  {
    id:    '03',
    label: 'DEPLOY',
    color: '#00FF94',
    items: ['System & CRM integration', 'Team onboarding', 'Performance monitoring', 'Iterative improvement'],
  },
]

// ── Domain cards ────────────────────────────────────────────
const DOMAINS = [
  {
    id:    'd01',
    title: 'Professional Digital Presence',
    color: '#00FF94',
    stack: ['Next.js', 'React', 'Vercel', 'Supabase'],
  },
  {
    id:    'd02',
    title: 'AI Chatbots & Voice Assistants',
    color: '#00D4FF',
    stack: ['OpenAI API', 'Claude API', 'Voice AI', 'RAG'],
  },
  {
    id:    'd03',
    title: 'AI Lead Generation',
    color: '#4A9EFF',
    stack: ['n8n', 'Make', 'CRM APIs', 'LangChain'],
  },
  {
    id:    'd04',
    title: 'AI Social Media & Content',
    color: '#FFB800',
    stack: ['LLMs', 'Zapier', 'Multimodal AI', 'APIs'],
  },
  {
    id:    'd05',
    title: 'AI Advertising Automation',
    color: '#FF7A4A',
    stack: ['Google Ads API', 'Meta API', 'Python', 'Analytics'],
  },
  {
    id:    'd06',
    title: 'AI SEO & Content Optimization',
    color: '#00FF94',
    stack: ['RAG', 'Vector DB', 'Python', 'Content APIs'],
  },
  {
    id:    'd07',
    title: 'AI Documents & Presentations',
    color: '#B78BFF',
    stack: ['LLMs', 'Python', 'Document APIs', 'Templates'],
  },
  {
    id:    'd08',
    title: 'AI Reporting & Business Intelligence',
    color: '#00D4FF',
    stack: ['PostgreSQL', 'Firebase', 'LangGraph', 'Analytics'],
  },
]

// ── Tech stack footer ───────────────────────────────────────
const STACK_FOOTER = [
  'LLMs', 'AI Agents', 'RAG Systems', 'Vector Databases',
  'LangChain', 'LangGraph', 'OpenAI API', 'Anthropic API',
  'Next.js', 'React', 'Node.js', 'Python',
  'Supabase', 'PostgreSQL', 'Firebase',
  'n8n', 'Make', 'Zapier', 'Vercel',
  'Voice AI', 'Multimodal AI',
]

// ── Dot grid background ────────────────────────────────────
function DotGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'radial-gradient(circle, rgba(0,212,255,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

// ── Phase connector ────────────────────────────────────────
function PhaseConnector({ color, delay }: { color: string; delay: number }) {
  return (
    <div
      className="hidden lg:flex"
      style={{
        position: 'relative',
        width: '64px',
        alignItems: 'center',
        flexShrink: 0,
        marginTop: '0',
        alignSelf: 'center',
      }}
    >
      {/* line */}
      <motion.div
        style={{ width: '100%', height: '1px', backgroundColor: color, opacity: 0.3 }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay, duration: 0.6, ease: EASE }}
      />
      {/* traveling dot */}
      <motion.div
        style={{
          position: 'absolute',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: color,
          top: '50%',
          transform: 'translateY(-50%)',
          boxShadow: `0 0 8px ${color}`,
        }}
        initial={{ left: '0%', opacity: 0 }}
        whileInView={{ left: ['0%', '100%', '0%'], opacity: [0, 1, 1, 0] }}
        viewport={{ once: false }}
        transition={{ delay: delay + 0.4, duration: 2.4, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
      />
      {/* arrow */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: `6px solid ${color}`,
          opacity: 0.4,
        }}
      />
    </div>
  )
}

// ── Domain card ─────────────────────────────────────────────
function DomainCard({ domain, index }: { domain: typeof DOMAINS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? domain.color + '30' : 'rgba(255,255,255,0.07)'}`,
        padding: '20px 20px 0 20px',
        cursor: 'default',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 32px ${domain.color}14` : 'none',
        transition: 'background-color 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        overflow: 'hidden',
        minHeight: '100px',
      }}
    >
      {/* accent top line */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          backgroundColor: domain.color,
          opacity: hovered ? 0.9 : 0.3,
          transition: 'opacity 0.2s',
        }}
      />

      {/* card index */}
      <span
        className="font-mono"
        style={{
          fontSize: '10px',
          color: domain.color,
          opacity: 0.5,
          letterSpacing: '0.15em',
          display: 'block',
          marginBottom: '8px',
        }}
      >
        {domain.id.toUpperCase()}
      </span>

      {/* title */}
      <p
        className="font-mono"
        style={{
          fontSize: '12px',
          color: '#E8E8E0',
          fontWeight: 500,
          letterSpacing: '0.02em',
          lineHeight: 1.4,
          marginBottom: '0',
        }}
      >
        {domain.title}
      </p>

      {/* tech tags — slide up on hover */}
      <div
        style={{
          maxHeight: hovered ? '48px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            paddingTop: '10px',
            paddingBottom: '16px',
          }}
        >
          {domain.stack.map(tech => (
            <span
              key={tech}
              className="font-mono"
              style={{
                fontSize: '9px',
                color: domain.color,
                border: `1px solid ${domain.color}30`,
                backgroundColor: `${domain.color}0A`,
                padding: '2px 6px',
                letterSpacing: '0.1em',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── AI Photo Frame — WAICF ────────────────────────────────
function AIPhotoFrame({ inView }: { inView: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="hidden lg:block"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
      style={{
        position:  'absolute',
        top:       'clamp(72px,8vw,120px)',
        right:     'clamp(48px,10vw,160px)',
        width:     'clamp(300px,34%,440px)',
        height:    'clamp(500px,56%,620px)',
        zIndex:    0,
        pointerEvents: 'none',
        overflow:  'hidden',
      }}
    >
      {/* ── Photo ───────────────────────────────── */}
      <div style={{
        position:           'absolute', inset: 0,
        backgroundImage:    'url(/samih-waicf.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center 20%',
        filter:             'brightness(0.32) contrast(1.1) saturate(0.25)',
      }} />

      {/* Cyan tint */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(0,212,255,0.09) 0%, rgba(74,158,255,0.04) 100%)',
      }} />

      {/* Blueprint grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: [
          'linear-gradient(rgba(0,212,255,0.055) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,212,255,0.055) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '28px 28px',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(3,3,3,0.55) 100%)',
      }} />

      {/* Outer border */}
      <div style={{
        position: 'absolute', inset: 0,
        border: '1px solid rgba(0,212,255,0.2)',
        pointerEvents: 'none',
      }} />

      {/* ── Scan line ───────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'linear-gradient(to right, transparent 0%, rgba(0,212,255,0.6) 25%, rgba(0,212,255,1) 50%, rgba(0,212,255,0.6) 75%, transparent 100%)',
          boxShadow:  '0 0 14px 2px rgba(0,212,255,0.45)',
          zIndex:     4,
        }}
        animate={{ top: ['-2px', '102%'] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'linear', delay: 0.8 }}
      />

      {/* ── Corner brackets ─────────────────────── */}
      {/* top-left */}
      <motion.div style={{ position: 'absolute', top: 10, left: 10, width: 22, height: 22, zIndex: 5 }}
        animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', backgroundColor: '#00D4FF' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '100%', backgroundColor: '#00D4FF' }} />
      </motion.div>
      {/* top-right */}
      <motion.div style={{ position: 'absolute', top: 10, right: 10, width: 22, height: 22, zIndex: 5 }}
        animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.55 }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '1px', backgroundColor: '#00D4FF' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '1px', height: '100%', backgroundColor: '#00D4FF' }} />
      </motion.div>
      {/* bottom-left (above caption) */}
      <motion.div style={{ position: 'absolute', bottom: 52, left: 10, width: 18, height: 18, zIndex: 5 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', backgroundColor: '#00D4FF' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '1px', height: '100%', backgroundColor: '#00D4FF' }} />
      </motion.div>
      {/* bottom-right (above caption) */}
      <motion.div style={{ position: 'absolute', bottom: 52, right: 10, width: 18, height: 18, zIndex: 5 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.65 }}>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '1px', backgroundColor: '#00D4FF' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '1px', height: '100%', backgroundColor: '#00D4FF' }} />
      </motion.div>

      {/* ── Top status label ────────────────────── */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: '6px', zIndex: 5,
      }}>
        <motion.div
          style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00D4FF', flexShrink: 0 }}
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
        <span className="font-mono" style={{ fontSize: '7px', color: '#00D4FF', letterSpacing: '0.22em', opacity: 0.75, whiteSpace: 'nowrap' }}>
          WAICF_2024 · CANNES
        </span>
      </div>

      {/* ── Caption strip ───────────────────────── */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
          backgroundColor: 'rgba(3,3,3,0.88)',
          borderTop: '1px solid rgba(0,212,255,0.22)',
          padding: '9px 12px 10px',
        }}
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <p className="font-mono" style={{ fontSize: '8px', color: '#00D4FF', letterSpacing: '0.14em', marginBottom: '3px', opacity: 0.85 }}>
          // World AI Cannes Festival
        </p>
        <p className="font-mono" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', lineHeight: 1.45 }}>
          Deployed on-site with students — Cannes 2024
        </p>
      </motion.div>
    </motion.div>
  )
}

// ── Main export ─────────────────────────────────────────────
export function ForwardDeployed() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden:   {},
    visible:  { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  }
  const itemVariants = {
    hidden:   { opacity: 0, y: 16 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  }

  return (
    <section
      id="fwdai"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#030303',
        paddingTop: 'clamp(40px,4.5vw,72px)',
        paddingBottom: 'clamp(40px,4.5vw,72px)',
        paddingLeft: 'clamp(48px,10vw,160px)',
        paddingRight: 'clamp(48px,10vw,160px)',
        overflow: 'hidden',
      }}
    >
      <DotGrid />
      <AIPhotoFrame inView={inView} />

      {/* ── Section header ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1, marginBottom: '56px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="font-mono" style={{ fontSize: '11px', color: '#3A3A36', letterSpacing: '0.25em' }}>//</span>
          <span className="font-mono" style={{ fontSize: '11px', color: '#3A3A36', letterSpacing: '0.25em', fontWeight: 500, textTransform: 'uppercase' }}>
            03 · FWDAI
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: '9px',
              color: '#00D4FF',
              border: '1px solid rgba(0,212,255,0.25)',
              backgroundColor: 'rgba(0,212,255,0.06)',
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

      {/* ── Hero title block ────────────────────────── */}
      <motion.div
        style={{ position: 'relative', zIndex: 1, marginBottom: '24px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
      >
        <h2
          className="font-mono font-bold"
          style={{
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#E8E8E0',
          }}
        >
          FORWARD DEPLOYED
          <br />
          <span style={{ color: '#00D4FF' }}>AI ENGINEER</span>
        </h2>
      </motion.div>

      {/* ── Tagline ─────────────────────────────────── */}
      <motion.p
        className="font-sans"
        style={{
          fontSize: 'clamp(14px, 1.4vw, 18px)',
          color: '#ffffff',
          maxWidth: '560px',
          lineHeight: 1.6,
          position: 'relative',
          zIndex: 1,
          marginBottom: '16px',
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.18, duration: 0.55, ease: EASE }}
      >
        I design, build and deploy AI-powered systems directly inside real businesses.
      </motion.p>

      {/* ── Bridge statement ────────────────────────── */}
      <motion.p
        className="font-mono"
        style={{
          fontSize: 'clamp(12px, 1.1vw, 14px)',
          maxWidth: '640px',
          lineHeight: 1.7,
          position: 'relative',
          zIndex: 1,
          marginBottom: '72px',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.24, duration: 0.5, ease: EASE }}
      >
        <span style={{ color: '#ffffff' }}>I bridge the gap between </span>
        <span style={{ color: '#4A9EFF' }}>business needs</span>
        <span style={{ color: '#ffffff' }}>, </span>
        <span style={{ color: '#00D4FF' }}>AI strategy</span>
        <span style={{ color: '#ffffff' }}>, </span>
        <span style={{ color: '#00FF94' }}>full-stack engineering</span>
        <span style={{ color: '#ffffff' }}> and </span>
        <span style={{ color: '#FFB800' }}>real-world deployment</span>
        <span style={{ color: '#ffffff' }}>.</span>
      </motion.p>

      {/* ── Phase pipeline ──────────────────────────── */}
      <motion.div
        style={{ position: 'relative', zIndex: 1, marginBottom: '72px' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Label */}
        <p
          className="font-mono"
          style={{
            fontSize: '10px',
            color: '#ffffff',
            letterSpacing: '0.2em',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          DEPLOYMENT PIPELINE
        </p>

        {/* Desktop horizontal */}
        <div
          className="hidden lg:flex"
          style={{ alignItems: 'stretch', gap: '0' }}
        >
          {PHASES.map((phase, i) => (
            <div key={phase.id} style={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: EASE }}
                style={{
                  border: `1px solid ${phase.color}25`,
                  backgroundColor: `${phase.color}07`,
                  padding: '24px',
                  minWidth: '200px',
                  flex: 1,
                }}
              >
                {/* Phase id */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="font-mono" style={{ fontSize: '10px', color: phase.color, letterSpacing: '0.2em' }}>
                    [{phase.id}]
                  </span>
                  <span className="font-mono" style={{ fontSize: '11px', color: phase.color, fontWeight: 700, letterSpacing: '0.15em' }}>
                    {phase.label}
                  </span>
                </div>
                {/* Divider */}
                <div style={{ height: '1px', backgroundColor: `${phase.color}20`, marginBottom: '14px' }} />
                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {phase.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span className="font-mono" style={{ fontSize: '10px', color: phase.color, opacity: 0.5, marginTop: '1px', flexShrink: 0 }}>›</span>
                      <span className="font-mono" style={{ fontSize: '11px', color: '#ffffff', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Connector between phases */}
              {i < PHASES.length - 1 && (
                <PhaseConnector color={PHASES[i + 1].color} delay={i * 0.15 + 0.35} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="flex flex-col lg:hidden" style={{ gap: '1px', backgroundColor: 'rgba(255,255,255,0.04)' }}>
          {PHASES.map((phase) => (
            <div
              key={phase.id}
              style={{
                backgroundColor: '#030303',
                borderLeft: `2px solid ${phase.color}40`,
                padding: '20px 20px 20px 20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: phase.color, letterSpacing: '0.15em' }}>
                  [{phase.id}] {phase.label}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {phase.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px' }}>
                    <span className="font-mono" style={{ fontSize: '10px', color: phase.color, opacity: 0.4 }}>›</span>
                    <span className="font-mono" style={{ fontSize: '11px', color: '#ffffff' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Domain cards grid ───────────────────────── */}
      <motion.div
        style={{ position: 'relative', zIndex: 1, marginBottom: '56px' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <p
          className="font-mono"
          style={{
            fontSize: '10px',
            color: '#ffffff',
            letterSpacing: '0.2em',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          DEPLOYMENT DOMAINS
        </p>

        {/* Grid — sm:2 cols  lg:4 cols */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: '1px',
            backgroundColor: 'rgba(255,255,255,0.04)',
          }}
        >
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} />
          ))}
        </div>
      </motion.div>

      {/* ── Tech stack footer ───────────────────────── */}
      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
      >
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '28px',
          }}
        >
          <p
            className="font-mono"
            style={{
              fontSize: '10px',
              color: '#ffffff',
              letterSpacing: '0.2em',
              fontWeight: 'bold',
              marginBottom: '14px',
            }}
          >
            FULL STACK
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {STACK_FOOTER.map((tech, i) => (
              <motion.span
                key={tech}
                className="font-mono"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.52 + i * 0.025, duration: 0.35 }}
                style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '4px 10px',
                  letterSpacing: '0.1em',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  )
}
