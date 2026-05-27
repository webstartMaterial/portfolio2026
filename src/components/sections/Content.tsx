'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Content channels ──────────────────────────────────────
const CHANNELS = [
  {
    id:     'CH_01',
    status: 'ON AIR',
    title:  'Vidéos Éducatives',
    desc:   'Tutoriels, deep dives et breakdowns tech — du concept à l\'implémentation concrète.',
    color:  '#FF4D4D',
  },
  {
    id:     'CH_02',
    status: 'PUBLISHED',
    title:  'Formations en Ligne',
    desc:   'Cours complets avec projets guidés, exercices pratiques et progression structurée.',
    color:  '#00FF94',
  },
  {
    id:     'CH_03',
    status: 'ACTIVE',
    title:  'Storytelling Tech',
    desc:   'Fils narratifs qui rendent la technologie humaine, concrète et mémorable.',
    color:  '#4A9EFF',
  },
  {
    id:     'CH_04',
    status: 'RUNNING',
    title:  'Vulgarisation IA',
    desc:   'L\'intelligence artificielle expliquée sans jargon — avec impact, exemples et clarté.',
    color:  '#FFB800',
  },
  {
    id:     'CH_05',
    status: 'LIVE',
    title:  'Ateliers Interactifs',
    desc:   'Sessions en direct, démos live et expériences pédagogiques immersives.',
    color:  '#FF4D4D',
  },
] as const

// ── Ticker topics ─────────────────────────────────────────
const TOPICS = [
  'React', 'Next.js', 'Intelligence Artificielle', 'Développement Web',
  'Prompt Engineering', 'LLMs', 'Python', 'Architecture Logicielle',
  'TypeScript', 'API Design', 'Symfony', 'Node.js', 'Machine Learning',
  'CSS Avancé', 'DevOps', 'Docker', 'PostgreSQL', 'UX Design',
]

// ── Live indicator dot ────────────────────────────────────
function LiveDot({ color }: { color: string }) {
  return (
    <span className="relative inline-flex items-center justify-center w-2.5 h-2.5 flex-shrink-0">
      <motion.span
        className="absolute inline-block rounded-full"
        style={{ width: '10px', height: '10px', backgroundColor: color, opacity: 0.25 }}
        animate={{ scale: [1, 1.9, 1], opacity: [0.25, 0, 0.25] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      />
      <span
        className="relative inline-block rounded-full"
        style={{ width: '5px', height: '5px', backgroundColor: color }}
      />
    </span>
  )
}

// ── Channel card ──────────────────────────────────────────
function ChannelCard({
  ch,
  index,
  inView,
}: {
  ch:     typeof CHANNELS[number]
  index:  number
  inView: boolean
}) {
  const ref     = useRef<HTMLDivElement>(null)

  const onEnter = () => {
    if (!ref.current) return
    ref.current.style.backgroundColor = '#0F0F0F'
    ref.current.style.borderColor     = `${ch.color}28`
    ref.current.style.boxShadow       = `0 8px 32px ${ch.color}08`
    ref.current.style.transform       = 'translateY(-3px)'
    const title = ref.current.querySelector<HTMLElement>('.ch-title')
    if (title) title.style.color = '#E8E8E0'
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.backgroundColor = '#0A0A0A'
    ref.current.style.borderColor     = 'rgba(255,255,255,0.07)'
    ref.current.style.boxShadow       = 'none'
    ref.current.style.transform       = 'translateY(0)'
    const title = ref.current.querySelector<HTMLElement>('.ch-title')
    if (title) title.style.color = '#C8C8C0'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.25 + index * 0.1, duration: 0.55, ease: EASE }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        backgroundColor: '#0A0A0A',
        border:          '1px solid rgba(255,255,255,0.07)',
        padding:         '24px 26px 22px',
        display:         'flex',
        flexDirection:   'column' as const,
        gap:             '0',
        cursor:          'default',
        transition:      'background-color 0.2s, border-color 0.2s, box-shadow 0.25s, transform 0.25s',
      }}
    >
      {/* Header: ID + live status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <span className="font-mono" style={{ fontSize: '10px', color: '#4A4A44', letterSpacing: '0.2em' }}>
          {ch.id}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <LiveDot color={ch.color} />
          <span
            className="font-mono"
            style={{ fontSize: '9px', letterSpacing: '0.2em', color: ch.color }}
          >
            {ch.status}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="ch-title font-mono font-bold"
        style={{
          fontSize:      'clamp(17px, 1.8vw, 21px)',
          color:         '#C8C8C0',
          letterSpacing: '-0.02em',
          lineHeight:    1.2,
          marginBottom:  '12px',
          transition:    'color 0.2s',
        }}
      >
        {ch.title}
      </h3>

      {/* Description */}
      <p
        className="font-sans"
        style={{
          fontSize:  '13px',
          color:     '#4A4A44',
          lineHeight: 1.7,
          flexGrow:   1,
        }}
      >
        {ch.desc}
      </p>

      {/* Bottom accent line */}
      <div
        style={{
          height:          '1px',
          backgroundColor: `${ch.color}18`,
          marginTop:       '20px',
        }}
      />
    </motion.div>
  )
}

// ── Main section ───────────────────────────────────────────
export function Content() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })

  const ticker = [...TOPICS, ...TOPICS].join('  ·  ')

  return (
    <section
      id="content"
      ref={sectionRef}
      className="relative w-full py-36 overflow-hidden"
      style={{
        paddingTop: 'clamp(40px,4.5vw,72px)',
        paddingBottom: 'clamp(80px,9vw,144px)',
      }}
    >
      {/* ── Section header ──────────────────────────────── */}
      <div style={{ paddingLeft: 'clamp(48px,10vw,160px)', paddingRight: 'clamp(48px,10vw,160px)' }}>
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs" style={{ color: '#4A4A44', letterSpacing: '0.25em' }}>//</span>
          <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase" style={{ color: '#4A4A44' }}>
            06 · CONTENT CREATOR
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span
            className="font-mono text-[9px] px-3 py-1 tracking-[0.2em]"
            style={{ color: '#FFB800', border: '1px solid rgba(255,184,0,0.2)', backgroundColor: 'rgba(255,184,0,0.06)' }}
          >
            RUNNING
          </span>
        </motion.div>

        {/* Headline */}
        <motion.p
          className="font-mono mb-16"
          style={{ fontSize: 'clamp(22px,3vw,38px)', color: '#E8E8E0', letterSpacing: '-0.02em', maxWidth: '560px' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
        >
          Rendre la tech accessible.
        </motion.p>
      </div>

      {/* ── Broadcast ticker ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          borderTop:    '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding:      '10px 0',
          marginBottom: '48px',
          overflow:     'hidden',
          whiteSpace:   'nowrap',
        }}
      >
        <motion.span
          className="font-mono inline-block"
          style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#4A4A44' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        >
          {ticker}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ticker}
        </motion.span>
      </motion.div>

      {/* ── Channel cards grid ───────────────────────────── */}
      <div
        style={{
          paddingLeft:  'clamp(48px,10vw,160px)',
          paddingRight: 'clamp(48px,10vw,160px)',
        }}
      >
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap:                 '1px',
            background:          'rgba(255,255,255,0.04)',
            marginBottom:        '56px',
          }}
        >
          {CHANNELS.map((ch, i) => (
            <ChannelCard key={ch.id} ch={ch} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Philosophy statement ─────────────────────── */}
        <motion.div
          className="flex items-start gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.55, ease: EASE }}
        >
          <div
            style={{
              width:           '2px',
              minHeight:       '56px',
              backgroundColor: '#FFB800',
              opacity:         0.4,
              flexShrink:      0,
              marginTop:       '4px',
            }}
          />
          <div className="flex flex-col gap-2">
            <p
              className="font-sans"
              style={{ fontSize: 'clamp(16px,1.8vw,20px)', color: '#E8E8E0', lineHeight: 1.5, fontStyle: 'italic' }}
            >
              "La complexité n'est pas un obstacle.
              <br />
              C'est un angle de narration."
            </p>
            <span
              className="font-mono text-xs tracking-[0.15em]"
              style={{ color: '#4A4A44' }}
            >
              — APPROCHE ÉDITORIALE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
