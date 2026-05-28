'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Tag colors ────────────────────────────────────────────
const TAG_COLOR: Record<string, string> = {
  DEV:       '#00FF94',
  FORMATION: '#4A9EFF',
  CONTENT:   '#FFB800',
}

// ── Timeline entries ──────────────────────────────────────
const ENTRIES = [
  {
    year:  '2015',
    log:   'INIT',
    title: 'Premiers cours de développement',
    desc:  'Bootcamp intensif — HTML, CSS, JavaScript. Le déclic pédagogique.',
    tag:   'DEV',
  },
  {
    year:  '2016',
    log:   'FORK',
    title: 'Formateur indépendant',
    desc:  'Premières salles de classe. Du code au tableau blanc. Transmission 1:1.',
    tag:   'FORMATION',
  },
  {
    year:  '2018',
    log:   'BUILD',
    title: 'Architecture Symfony & PHP',
    desc:  'Backend structuré, projets clients, premières architectures production.',
    tag:   'DEV',
  },
  {
    year:  '2019',
    log:   'DEPLOY',
    title: 'Chargé de cours officiel',
    desc:  'Cursus complets conçus de zéro. Objectifs, séquencement, évaluation.',
    tag:   'FORMATION',
  },
  {
    year:  '2020',
    log:   'SCALE',
    title: 'Pivot formation à distance',
    desc:  'Migration digitale forcée. 1 000+ apprenants. Nouveaux formats, nouvelle portée.',
    tag:   'FORMATION',
  },
  {
    year:  '2021',
    log:   'UPGRADE',
    title: 'Transition React & Next.js',
    desc:  'Full stack moderne. Du serveur au client, une seule vision cohérente.',
    tag:   'DEV',
  },
  {
    year:  '2022',
    log:   'PUBLISH',
    title: 'Lancement contenu IA',
    desc:  'Premières vidéos éducatives. Storytelling tech. La chaîne prend forme.',
    tag:   'CONTENT',
  },
  {
    year:  '2023',
    log:   'MILESTONE',
    title: '5 000+ apprenants franchis',
    desc:  'Ateliers IA en entreprise. Intelligence artificielle pour tous les niveaux.',
    tag:   'FORMATION',
  },
  {
    year:  '2024',
    log:   'INTEGRATE',
    title: 'Prompt Engineering & LLMs',
    desc:  'IA en production. Agents, RAG, fine-tuning. La frontière devient terrain de jeu.',
    tag:   'DEV',
  },
  {
    year:  '2025',
    log:   'CURRENT',
    title: 'Terminal Noir — Nouvelle ère',
    desc:  'Code + pédagogie + contenu. Tout converge. Ce portfolio en est la preuve.',
    tag:   'CONTENT',
    current: true,
  },
] as const

// ── Node dot ──────────────────────────────────────────────
function NodeDot({ color, current }: { color: string; current?: boolean }) {
  return (
    <div
      style={{
        position:        'relative',
        width:           current ? '10px' : '7px',
        height:          current ? '10px' : '7px',
        flexShrink:      0,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      {current && (
        <motion.span
          style={{
            position:        'absolute',
            width:           '18px',
            height:          '18px',
            borderRadius:    '50%',
            backgroundColor: color,
            opacity:         0.15,
          }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0, 0.15] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
      )}
      <div
        style={{
          width:           current ? '10px' : '7px',
          height:          current ? '10px' : '7px',
          borderRadius:    '50%',
          backgroundColor: color,
          opacity:         current ? 1 : 0.5,
        }}
      />
    </div>
  )
}

// ── Entry block ───────────────────────────────────────────
function Entry({
  entry,
  index,
  side,
}: {
  entry:  typeof ENTRIES[number]
  index:  number
  side:   'left' | 'right'
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const color  = TAG_COLOR[entry.tag]
  const isCurrent = 'current' in entry && entry.current

  const cardStyle: React.CSSProperties = {
    backgroundColor: isCurrent ? '#0F0F0F' : '#0A0A0A',
    border:          `1px solid ${isCurrent ? `${color}28` : 'rgba(255,255,255,0.06)'}`,
    padding:         '20px 24px 18px',
    position:        'relative',
    flex:            1,
    maxWidth:        '420px',
  }

  return (
    <div
      ref={ref}
      style={{
        display:        'grid',
        gridTemplateColumns: '1fr 28px 1fr',
        alignItems:     'center',
        gap:            '0',
        position:       'relative',
      }}
    >
      {/* Left side content */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
        {side === 'left' ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            style={cardStyle}
          >
            <CardContent entry={entry} color={color} isCurrent={!!isCurrent} />
          </motion.div>
        ) : (
          <YearLabel year={entry.year} log={entry.log} color={color} inView={inView} side="left" />
        )}
      </div>

      {/* Center dot */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
        <NodeDot color={color} current={!!isCurrent} />
      </div>

      {/* Right side content */}
      <div style={{ paddingLeft: '20px' }}>
        {side === 'right' ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            style={cardStyle}
          >
            <CardContent entry={entry} color={color} isCurrent={!!isCurrent} />
          </motion.div>
        ) : (
          <YearLabel year={entry.year} log={entry.log} color={color} inView={inView} side="right" />
        )}
      </div>
    </div>
  )
}

function YearLabel({
  year, log, color, inView, side,
}: {
  year: string; log: string; color: string; inView: boolean; side: 'left' | 'right'
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 0.2, duration: 0.4 }}
      style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    side === 'left' ? 'flex-end' : 'flex-start',
        gap:           '3px',
      }}
    >
      <span className="font-mono" style={{ fontSize: '9px', color: color, letterSpacing: '0.2em', opacity: 0.7 }}>
        [{log}]
      </span>
      <span className="font-mono font-bold" style={{ fontSize: 'clamp(22px,2.5vw,30px)', color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {year}
      </span>
    </motion.div>
  )
}

function CardContent({
  entry, color, isCurrent,
}: {
  entry: typeof ENTRIES[number]; color: string; isCurrent: boolean
}) {
  return (
    <>
      {isCurrent && (
        <div
          style={{
            position:        'absolute',
            top:             0,
            left:            0,
            right:           0,
            height:          '1px',
            backgroundColor: color,
            opacity:         0.4,
          }}
        />
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span
          className="font-mono"
          style={{
            fontSize:        '9px',
            color:           color,
            letterSpacing:   '0.2em',
            padding:         '2px 7px',
            border:          `1px solid ${color}28`,
            backgroundColor: `${color}0A`,
          }}
        >
          {entry.tag}
        </span>
        <span className="font-mono" style={{ fontSize: '9px', color: '#ffffff', letterSpacing: '0.15em' }}>
          {entry.year}
        </span>
      </div>
      <h4
        className="font-mono font-medium"
        style={{ fontSize: 'clamp(13px,1.4vw,15px)', color: isCurrent ? '#E8E8E0' : '#C8C8C0', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.3 }}
      >
        {entry.title}
      </h4>
      <p
        className="font-sans"
        style={{ fontSize: '12px', color: '#ffffff', lineHeight: 1.7 }}
      >
        {entry.desc}
      </p>
    </>
  )
}

// ── Mobile entry ──────────────────────────────────────────
function MobileEntry({ entry, index }: { entry: typeof ENTRIES[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const color  = TAG_COLOR[entry.tag]
  const isCurrent = 'current' in entry && entry.current

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1, duration: 0.45, ease: EASE }}
      style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative' }}
    >
      {/* Dot column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '4px' }}>
        <NodeDot color={color} current={!!isCurrent} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="font-mono font-bold" style={{ fontSize: '20px', color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {entry.year}
          </span>
          <span className="font-mono" style={{ fontSize: '9px', color: color, letterSpacing: '0.2em', opacity: 0.8 }}>
            [{entry.log}]
          </span>
        </div>
        <span
          className="font-mono"
          style={{ fontSize: '9px', color, letterSpacing: '0.2em', padding: '2px 7px', border: `1px solid ${color}28`, backgroundColor: `${color}0A`, display: 'inline-block', marginBottom: '8px' }}
        >
          {entry.tag}
        </span>
        <h4 className="font-mono font-medium" style={{ fontSize: '14px', color: isCurrent ? '#E8E8E0' : '#C8C8C0', marginBottom: '6px', lineHeight: 1.3 }}>
          {entry.title}
        </h4>
        <p className="font-sans" style={{ fontSize: '12px', color: '#ffffff', lineHeight: 1.7 }}>
          {entry.desc}
        </p>
      </div>
    </motion.div>
  )
}

// ── Main section ───────────────────────────────────────────
export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })
  const lineInView = useInView(lineRef,    { once: true, margin: '-80px' })

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full py-36 overflow-hidden"
    >
      <div style={{ paddingLeft: 'clamp(48px,10vw,160px)', paddingRight: 'clamp(48px,10vw,160px)' }}>

        {/* ── Section header ───────────────────────────── */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs" style={{ color: '#3A3A36', letterSpacing: '0.25em' }}>//</span>
          <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase" style={{ color: '#3A3A36' }}>
            10 · TIMELINE
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span
            className="font-mono text-[9px] px-3 py-1 tracking-[0.2em]"
            style={{ color: '#00FF94', border: '1px solid rgba(0,255,148,0.2)', backgroundColor: 'rgba(0,255,148,0.06)' }}
          >
            RUNNING
          </span>
        </motion.div>

        {/* ── Headline ─────────────────────────────────── */}
        <motion.p
          className="font-mono mb-16"
          style={{ fontSize: 'clamp(22px,3vw,38px)', color: '#E8E8E0', letterSpacing: '-0.02em', maxWidth: '560px' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
        >
          10 ans de commits.
        </motion.p>

        {/* ── Legend ───────────────────────────────────── */}
        <motion.div
          className="flex items-center gap-6 mb-14 flex-wrap"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {Object.entries(TAG_COLOR).map(([tag, color]) => (
            <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: color }} />
              <span className="font-mono" style={{ fontSize: '9px', color: '#ffffff', letterSpacing: '0.2em' }}>{tag}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Desktop timeline ─────────────────────────── */}
        <div className="hidden md:block" ref={lineRef} style={{ position: 'relative' }}>
          {/* Central vertical line */}
          <div
            style={{
              position:        'absolute',
              left:            '50%',
              top:             0,
              bottom:          0,
              width:           '1px',
              transform:       'translateX(-50%)',
              backgroundColor: 'rgba(255,255,255,0.06)',
              transformOrigin: 'top center',
            }}
          >
            <motion.div
              style={{
                width:           '100%',
                height:          '100%',
                backgroundColor: 'rgba(255,255,255,0.06)',
                transformOrigin: 'top center',
              }}
              initial={{ scaleY: 0 }}
              animate={lineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.6, ease: EASE }}
            />
          </div>

          {/* Entries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {ENTRIES.map((entry, i) => (
              <Entry
                key={entry.year}
                entry={entry}
                index={i}
                side={i % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile timeline ───────────────────────────── */}
        <div className="md:hidden" style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position:        'absolute',
              left:            '3px',
              top:             0,
              bottom:          0,
              width:           '1px',
              backgroundColor: 'rgba(255,255,255,0.06)',
            }}
          />
          <div style={{ paddingLeft: '0', display: 'flex', flexDirection: 'column' }}>
            {ENTRIES.map((entry, i) => (
              <MobileEntry key={entry.year} entry={entry} index={i} />
            ))}
          </div>
        </div>

        {/* ── Footer status ─────────────────────────────── */}
        <motion.div
          className="mt-16 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ paddingTop: '2rem' }}
          >
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: '#ffffff' }}>
            LOG END — PROCESS STILL RUNNING
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </motion.div>

      </div>
    </section>
  )
}
