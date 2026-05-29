'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '@/data/portfolio'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const PER_PAGE = 4

const STATUS_COLOR: Record<string, string> = {
  DEPLOYED: '#00FF94',
  RUNNING:  '#FFB800',
  ACTIVE:   '#4A9EFF',
}

// ── Wall tile ──────────────────────────────────────────────
function WallTile({ src, index, isGlitchy }: { src: string; index: number; isGlitchy: boolean }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
      {/* Screenshot layer */}
      <motion.div
        style={{
          position:           'absolute',
          inset:              0,
          backgroundImage:    `url(${src})`,
          backgroundSize:     'cover',
          backgroundPosition: 'center',
        }}
        animate={isGlitchy ? {
          opacity: [1, 0.2, 1, 0.5, 1, 0.15, 1],
          filter: [
            'grayscale(0.5) brightness(0.45)',
            'grayscale(0) brightness(0.9)',
            'grayscale(0.8) brightness(0.12)',
            'grayscale(0.2) brightness(0.7)',
            'grayscale(0.5) brightness(0.45)',
            'grayscale(0.9) brightness(0.06)',
            'grayscale(0.5) brightness(0.45)',
          ],
        } : {
          opacity:  [0.82, 0.95, 0.82],
          filter: ['grayscale(0.5) brightness(0.45)', 'grayscale(0.4) brightness(0.52)', 'grayscale(0.5) brightness(0.45)'],
        }}
        transition={isGlitchy ? {
          duration: 0.6,
          ease:     'linear',
        } : {
          duration:  5 + (index % 4) * 1.2,
          repeat:    Infinity,
          ease:      'easeInOut',
          delay:     index * 0.2,
        }}
      />

      {/* White flash on glitch */}
      {isGlitchy && (
        <motion.div
          style={{ position: 'absolute', inset: 0, backgroundColor: 'white' }}
          animate={{ opacity: [0, 0.15, 0, 0.08, 0] }}
          transition={{ duration: 0.6, ease: 'linear' }}
        />
      )}
    </div>
  )
}

// ── Background wall ────────────────────────────────────────
function BackgroundWall({ inView }: { inView: boolean }) {
  const screenshots = PROJECTS
    .map(p => ('screenshot' in p ? (p as typeof p & { screenshot?: string }).screenshot : ''))
    .filter(Boolean) as string[]

  // 8 tiles: 4 cols × 2 rows — 1 per screenshot
  const tiles = screenshots.slice(0, 8)

  // One glitch at a time, rotating every 3s
  const [glitchIdx, setGlitchIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setGlitchIdx(prev => {
        let next = prev
        while (next === prev) next = Math.floor(Math.random() * tiles.length)
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [tiles.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}
    >
      {/* Screenshot mosaic */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows:    'repeat(2, 1fr)',
          height:              '100%',
          width:               '100%',
          gap:                 '2px',
          backgroundColor:     '#000',
        }}
      >
        {tiles.map((src, i) => (
          <WallTile key={i} src={src} index={i} isGlitchy={i === glitchIdx} />
        ))}
      </div>

      {/* Dark vignette overlay */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(160deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.98) 100%)',
        }}
      />

      {/* CRT scanlines */}
      <div
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
          pointerEvents:   'none',
        }}
      />

      {/* Global green phosphor scan */}
      <motion.div
        style={{
          position:   'absolute',
          left:       0,
          right:      0,
          height:     '2px',
          background: 'linear-gradient(to right, transparent 0%, rgba(0,255,148,0.5) 30%, rgba(0,255,148,0.9) 50%, rgba(0,255,148,0.5) 70%, transparent 100%)',
          boxShadow:  '0 0 24px rgba(0,255,148,0.45)',
          zIndex:     2,
        }}
        animate={{ top: ['-2%', '102%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 1.5 }}
      />

      {/* Global noise pulse */}
      <motion.div
        style={{ position: 'absolute', inset: 0, backgroundColor: 'white', zIndex: 1, pointerEvents: 'none' }}
        animate={{ opacity: [0, 0, 0, 0.022, 0, 0, 0.014, 0, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
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
  const screenshot  = 'screenshot' in project
    ? (project as typeof project & { screenshot?: string }).screenshot
    : undefined

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:        'relative',
        overflow:        'hidden',
        isolation:       'isolate',
        backgroundColor: '#0A0A0A',
        border:          `1px solid ${hovered ? 'rgba(0,255,148,0.25)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow:       hovered ? '0 12px 40px rgba(0,255,148,0.08)' : 'none',
        transform:       hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:      'border-color 0.3s, box-shadow 0.3s, transform 0.25s',
        padding:         '28px 32px 24px',
        display:         'flex',
        flexDirection:   'column' as const,
        cursor:          'pointer',
      }}
    >
      {/* Screenshot background (per card) */}
      {screenshot && (
        <>
          <div
            style={{
              position:           'absolute',
              inset:              0,
              zIndex:             -2,
              backgroundImage:    `url(${screenshot})`,
              backgroundSize:     'cover',
              backgroundPosition: 'center top',
              filter:             hovered
                ? 'grayscale(0.25) brightness(0.42)'
                : 'grayscale(0.65) brightness(0.18)',
              transform:          hovered ? 'scale(1.04)' : 'scale(1)',
              transition:         'filter 0.55s ease, transform 0.65s ease',
            }}
          />
          <div
            style={{
              position:   'absolute',
              inset:      0,
              zIndex:     -1,
              background: hovered
                ? 'linear-gradient(160deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.68) 100%)'
                : 'linear-gradient(160deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.78) 100%)',
              transition: 'background 0.55s ease',
            }}
          />
        </>
      )}

      {/* Header: PID + status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>PID</span>
          <span className="font-mono font-bold" style={{ fontSize: '13px', color: '#ffffff', letterSpacing: '0.1em' }}>{project.id}</span>
          <span style={{ height: '1px', width: '40px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
        </div>
        <span
          className="font-mono"
          style={{
            fontSize:        '9px',
            letterSpacing:   '0.2em',
            padding:         '4px 10px',
            color:           statusColor,
            border:          `1px solid ${statusColor}28`,
            backgroundColor: `${statusColor}08`,
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Title */}
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

      {/* Description */}
      <p
        className="font-sans"
        style={{ fontSize: '14px', color: '#ffffff', lineHeight: 1.7, marginBottom: '24px', flexGrow: 1 }}
      >
        {project.desc}
      </p>

      {/* Separator */}
      <div
        style={{
          height:          '1px',
          backgroundColor: hovered ? 'rgba(0,255,148,0.12)' : 'rgba(255,255,255,0.05)',
          marginBottom:    '16px',
          transition:      'background-color 0.2s',
        }}
      />

      {/* Footer: stack + year */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono"
              style={{
                fontSize:        '10px',
                color:           '#ffffff',
                border:          `1px solid ${hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
                padding:         '3px 8px',
                letterSpacing:   '0.05em',
                transition:      'border-color 0.2s',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <span
          className="font-mono flex-shrink-0"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#ffffff', letterSpacing: '0.1em' }}
        >
          <span style={{ color: hovered ? '#00FF94' : '#1E1E1A', transition: 'color 0.2s', fontSize: '14px' }}>↗</span>
          {project.year}
        </span>
      </div>
    </motion.article>
  )
}

// ── Main export ───────────────────────────────────────────
export function Projects() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const inView      = useInView(sectionRef, { once: true, margin: '-60px' })
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(PROJECTS.length / PER_PAGE)
  const visible    = useMemo(
    () => PROJECTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE),
    [page]
  )

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: '#050505',
        paddingTop:      'clamp(40px,4.5vw,72px)',
        paddingBottom:   'clamp(80px,9vw,144px)',
        paddingLeft:     'clamp(48px,10vw,160px)',
        paddingRight:    'clamp(48px,10vw,160px)',
      }}
    >
      {/* ── Digital screenshot wall (background) ──────────── */}
      <BackgroundWall inView={inView} />

      {/* ── Foreground content ────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

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
          style={{ fontSize: 'clamp(22px,3vw,38px)', color: '#E8E8E0', letterSpacing: '-0.02em', maxWidth: '600px', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
        >
          Deployed systems.
        </motion.p>

        {/* Project grid */}
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
            gap:                 '1px',
            background:          'rgba(255,255,255,0.04)',
          }}
        >
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginTop: '48px' }}
        >
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="font-mono"
            style={{
              fontSize: '10px', letterSpacing: '0.2em',
              color: page === 0 ? 'rgba(255,255,255,0.15)' : '#ffffff',
              background: 'none', border: 'none',
              cursor: page === 0 ? 'not-allowed' : 'pointer',
              transition: 'color 0.2s',
            }}
          >
            ← PREV
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                style={{
                  width:           i === page ? '28px' : '8px',
                  height:          '8px',
                  borderRadius:    '4px',
                  backgroundColor: i === page ? '#00FF94' : 'rgba(255,255,255,0.18)',
                  border:          'none',
                  cursor:          'pointer',
                  transition:      'width 0.35s ease, background-color 0.25s ease',
                  padding:         0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="font-mono"
            style={{
              fontSize: '10px', letterSpacing: '0.2em',
              color: page === totalPages - 1 ? 'rgba(255,255,255,0.15)' : '#ffffff',
              background: 'none', border: 'none',
              cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
              transition: 'color 0.2s',
            }}
          >
            NEXT →
          </button>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="flex items-center gap-4"
          style={{ marginTop: '32px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span className="font-mono text-xs tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.82)' }}>
            MORE PROJECTS AVAILABLE ON REQUEST
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </motion.div>

      </div>
    </section>
  )
}
