'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '@/data/portfolio'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const STATUS_COLOR: Record<string, string> = {
  DEPLOYED: '#00FF94',
  RUNNING:  '#FFB800',
  ACTIVE:   '#4A9EFF',
}

// ── Project card ───────────────────────────────────────────
function ProjectCard({
  project,
  index,
  inView,
}: {
  project: typeof PROJECTS[number]
  index:   number
  inView:  boolean
}) {
  const [hovered, setHovered] = useState(false)
  const statusColor = STATUS_COLOR[project.status] ?? '#ffffff'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? '#0F0F0F' : '#0A0A0A',
        border:          `1px solid ${hovered ? 'rgba(0,255,148,0.18)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow:       hovered ? '0 12px 40px rgba(0,255,148,0.05)' : 'none',
        transform:       hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:      'background-color 0.2s, border-color 0.2s, box-shadow 0.25s, transform 0.25s',
        padding:         '28px 32px 24px',
        display:         'flex',
        flexDirection:   'column' as const,
        gap:             '0',
        cursor:          'pointer',
      }}
    >
      {/* ── Header row: PID + status ──────────────────────── */}
      <div
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            className="font-mono"
            style={{ fontSize: '10px', color: '#ffffff', letterSpacing: '0.2em' }}
          >
            PID
          </span>
          <span
            className="font-mono font-bold"
            style={{ fontSize: '13px', color: '#ffffff', letterSpacing: '0.1em' }}
          >
            {project.id}
          </span>
          <span style={{ flex: 1, height: '1px', width: '40px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
        </div>

        <span
          className="font-mono"
          style={{
            fontSize:        '9px',
            letterSpacing:   '0.2em',
            padding:         '4px 10px',
            color:            statusColor,
            border:          `1px solid ${statusColor}28`,
            backgroundColor: `${statusColor}08`,
          }}
        >
          {project.status}
        </span>
      </div>

      {/* ── Title ─────────────────────────────────────────── */}
      <h3
        className="font-mono font-bold"
        style={{
          fontSize:      'clamp(20px, 2vw, 26px)',
          color:         hovered ? '#E8E8E0' : '#C8C8C0',
          letterSpacing: '-0.02em',
          lineHeight:    1.15,
          marginBottom:  '14px',
          transition:    'color 0.2s',
        }}
      >
        {project.title}
      </h3>

      {/* ── Description ───────────────────────────────────── */}
      <p
        className="font-sans"
        style={{
          fontSize:     '14px',
          color:        '#ffffff',
          lineHeight:   1.7,
          marginBottom: '24px',
          flexGrow:     1,
        }}
      >
        {project.desc}
      </p>

      {/* ── Separator ─────────────────────────────────────── */}
      <div
        style={{
          height:          '1px',
          backgroundColor: hovered ? 'rgba(0,255,148,0.1)' : 'rgba(255,255,255,0.05)',
          marginBottom:    '16px',
          transition:      'background-color 0.2s',
        }}
      />

      {/* ── Footer: stack + year ──────────────────────────── */}
      <div
        style={{
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'space-between',
          gap:            '12px',
        }}
      >
        {/* Stack chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono"
              style={{
                fontSize:        '10px',
                color:            hovered ? '#ffffff' : '#ffffff',
                border:          `1px solid ${hovered ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)'}`,
                padding:         '3px 8px',
                letterSpacing:   '0.05em',
                transition:      'color 0.2s, border-color 0.2s',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Year */}
        <span
          className="font-mono flex-shrink-0 flex items-center gap-1.5"
          style={{ fontSize: '11px', color: '#ffffff', letterSpacing: '0.1em' }}
        >
          <span style={{ color: hovered ? '#00FF94' : '#1E1E1A', transition: 'color 0.2s', fontSize: '14px' }}>↗</span>
          {project.year}
        </span>
      </div>
    </motion.article>
  )
}

// ── Main section ───────────────────────────────────────────
export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full"
      style={{
        paddingTop: 'clamp(40px,4.5vw,72px)',
        paddingBottom: 'clamp(80px,9vw,144px)',
        paddingLeft: 'clamp(48px,10vw,160px)',
        paddingRight: 'clamp(48px,10vw,160px)'
      }}
      >
      {/* Section header */}
      <motion.div
        className="flex items-center gap-3"
        style={{ marginBottom: '48px' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-xs" style={{ color: '#3A3A36', letterSpacing: '0.25em' }}>//</span>
        <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase" style={{ color: '#3A3A36' }}>
          07 · PROJECTS
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </motion.div>

      {/* Headline */}
      <motion.p
        className="font-mono"
        style={{ fontSize: 'clamp(22px, 3vw, 38px)', color: '#E8E8E0', letterSpacing: '-0.02em', maxWidth: '600px', marginBottom: '64px' }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
      >
        Systèmes déployés.
      </motion.p>

      {/* Project grid */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap:                 '1px',
          background:          'rgba(255,255,255,0.04)',
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} inView={inView} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="flex items-center gap-4"
        style={{ marginTop: '56px' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <span className="font-mono text-xs tracking-[0.2em]" style={{ color: '#ffffff' }}>
          PLUS DE PROJETS SUR DEMANDE
        </span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </motion.div>

    </section>
  )
}
