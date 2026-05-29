'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Channel data ──────────────────────────────────────────
const CHANNELS = [
  { id: 'CH_01', status: 'ON AIR',     title: 'Educational Videos',   desc: 'Tutorials, deep dives and tech breakdowns — from concept to concrete implementation.', color: '#FF4D4D' },
  { id: 'CH_02', status: 'PUBLISHED',  title: 'Online Courses',        desc: 'Complete courses with guided projects, practical exercises and structured progression.', color: '#00FF94' },
  { id: 'CH_03', status: 'ACTIVE',     title: 'Tech Storytelling',     desc: 'Narrative threads that make technology human, concrete and memorable.', color: '#4A9EFF' },
  { id: 'CH_04', status: 'RUNNING',    title: 'AI Popularization',     desc: 'Artificial intelligence explained without jargon — with impact, examples and clarity.', color: '#FFB800' },
  { id: 'CH_05', status: 'LIVE',       title: 'Interactive Workshops', desc: 'Live sessions, live demos and immersive learning experiences.', color: '#FF4D4D' },
  { id: 'CH_06', status: 'SYSTEMIZED', title: 'Content Systems',       desc: 'Reusable formats, content pipelines and educational assets designed to scale knowledge.', color: '#00D4FF' },
] as const

// ── Video feed data ───────────────────────────────────────
const VIDEOS = [
  { id: '7u4XMDUWzlY', cam: 'CAM_01', label: 'AI Tools & Productivity', start: 0  },
  { id: 'CQF5bf6z0jE', cam: 'CAM_02', label: 'Dev Workflow',            start: 18 },
  { id: 'ygAuD83FAeA', cam: 'CAM_03', label: 'Tech Tutorial',           start: 50 },
  { id: '9RgIzfN9aLI', cam: 'CAM_04', label: 'Workshop Session',        start: 0  },
  { id: '8BAMQ0CSm7w', cam: 'CAM_05', label: 'Course Preview',          start: 0  },
  { id: 'quyVgEzThOU', cam: 'CAM_06', label: 'Live Demo',               start: 1  },
  { id: '0Ug_wBL3OLo', cam: 'CAM_07', label: 'Deep Dive',               start: 5  },
  { id: 'R4RkOPpOfP0', cam: 'CAM_08', label: 'Tutorial Series',         start: 0  },
]

// ── Ticker topics ─────────────────────────────────────────
const TOPICS = [
  'React', 'Next.js', 'Artificial Intelligence', 'Web Development',
  'Prompt Engineering', 'LLMs', 'Python', 'Software Architecture',
  'TypeScript', 'API Design', 'Symfony', 'Node.js', 'Machine Learning',
  'Advanced CSS', 'DevOps', 'Docker', 'PostgreSQL', 'UX Design',
]

// ── Live dot ──────────────────────────────────────────────
function LiveDot({ color }: { color: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '10px', flexShrink: 0 }}>
      <motion.span
        style={{ position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, opacity: 0.25 }}
        animate={{ scale: [1, 1.9, 1], opacity: [0.25, 0, 0.25] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      />
      <span style={{ position: 'relative', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: color }} />
    </span>
  )
}

// ── Live clock ────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const update = () => setTime(new Date().toTimeString().slice(0, 8))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="font-mono" style={{ fontSize: '8px', color: '#00D4FF', letterSpacing: '0.12em' }}>
      {time}
    </span>
  )
}

// ── Channel card (compact) ────────────────────────────────
function ChannelCard({
  ch,
  index,
  inView,
}: {
  ch: typeof CHANNELS[number]
  index: number
  inView: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onEnter = () => {
    if (!ref.current) return
    ref.current.style.backgroundColor = '#0F0F0F'
    ref.current.style.borderColor     = `${ch.color}28`
    ref.current.style.transform       = 'translateY(-2px)'
  }
  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.backgroundColor = '#0A0A0A'
    ref.current.style.borderColor     = 'rgba(255,255,255,0.07)'
    ref.current.style.transform       = 'translateY(0)'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.18 + index * 0.07, duration: 0.5, ease: EASE }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        backgroundColor: '#0A0A0A',
        border:          '1px solid rgba(255,255,255,0.07)',
        padding:         '16px 18px',
        display:         'flex',
        flexDirection:   'column',
        cursor:          'default',
        transition:      'background-color 0.2s, border-color 0.2s, transform 0.2s',
        overflow:        'hidden',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: '2px', backgroundColor: ch.color, opacity: 0.35, marginBottom: '14px', flexShrink: 0 }} />

      {/* Header row: ID + status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '9px' }}>
        <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
          {ch.id}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <LiveDot color={ch.color} />
          <span className="font-mono" style={{ fontSize: '8px', color: ch.color, letterSpacing: '0.18em' }}>{ch.status}</span>
        </div>
      </div>

      {/* Title */}
      <p className="font-mono" style={{ fontSize: '12px', fontWeight: 700, color: '#C8C8C0', letterSpacing: '0.02em', lineHeight: 1.3, marginBottom: '8px' }}>
        {ch.title}
      </p>

      {/* Description */}
      <p className="font-sans" style={{ fontSize: '11px', color: '#ffffff', lineHeight: 1.6, opacity: 0.65, flex: 1 }}>
        {ch.desc}
      </p>
    </motion.div>
  )
}

// ── Security screen ───────────────────────────────────────
function SecurityScreen({
  video,
  isActive,
  index,
  onClick,
}: {
  video:    typeof VIDEOS[number]
  isActive: boolean
  index:    number
  onClick:  () => void
}) {
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&disablekb=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&fs=0${video.start > 0 ? `&start=${video.start}` : ''}`

  return (
    <div
      onClick={onClick}
      style={{
        position:        'relative',
        flex:            1,
        overflow:        'hidden',
        cursor:          'pointer',
        backgroundColor: '#000',
        border:          `1px solid ${isActive ? 'rgba(0,255,148,0.5)' : 'rgba(0,212,255,0.1)'}`,
        boxShadow:       isActive ? '0 0 18px rgba(0,255,148,0.1), inset 0 0 30px rgba(0,255,148,0.04)' : 'none',
        transition:      'border-color 0.4s, box-shadow 0.4s',
        minHeight:       0,
      }}
    >
      {/* YouTube iframe — always mounted, all autoplay muted */}
      <iframe
        title={video.label}
        src={embedUrl}
        style={{
          position:      'absolute',
          top:           '-10%',
          left:          '-5%',
          width:         '110%',
          height:        '120%',
          border:        0,
          pointerEvents: 'none',
        }}
        allow="autoplay; encrypted-media"
      />

      {/* Thumbnail — always mounted, hidden when active */}
      <div
        style={{
          position:           'absolute',
          inset:              0,
          backgroundImage:    `url(${thumbUrl})`,
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          filter:             isActive ? 'none' : 'grayscale(0.55) brightness(0.5)',
          opacity:            isActive ? 0 : 1,
          transition:         'opacity 0.6s ease, filter 0.4s ease',
        }}
      />

      {/* Pointer-blocker — sits above iframe, prevents YouTube from receiving any mouse events → controls never appear */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      {/* CRT scanlines */}
      <div
        style={{
          position:        'absolute',
          inset:           0,
          zIndex:          2,
          pointerEvents:   'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
        }}
      />

      {/* Static noise flicker */}
      <motion.div
        style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', backgroundColor: 'white' }}
        animate={{ opacity: [0, 0, 0.025, 0, 0, 0.015, 0, 0] }}
        transition={{ duration: 3.5 + index * 0.7, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
      />

      {/* Horizontal scan artifact */}
      <motion.div
        style={{
          position:        'absolute',
          left:            0,
          right:           0,
          height:          '1px',
          zIndex:          3,
          pointerEvents:   'none',
          backgroundColor: 'rgba(255,255,255,0.15)',
        }}
        animate={{ top: ['-2%', '102%'] }}
        transition={{ duration: 5 + index * 0.8, repeat: Infinity, ease: 'linear', delay: index * 1.1 }}
      />

      {/* HUD — top left: cam label */}
      <div style={{ position: 'absolute', top: 6, left: 7, zIndex: 5 }}>
        <span
          className="font-mono"
          style={{ fontSize: '7px', color: isActive ? '#00FF94' : '#00D4FF', letterSpacing: '0.15em', opacity: isActive ? 1 : 0.7 }}
        >
          {video.cam}
        </span>
      </div>

      {/* HUD — top right: REC/IDLE */}
      <div style={{ position: 'absolute', top: 5, right: 7, zIndex: 5, display: 'flex', alignItems: 'center', gap: '3px' }}>
        <motion.div
          style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isActive ? '#FF4D4D' : '#2A2A2A' }}
          animate={isActive ? { opacity: [1, 0.1, 1] } : { opacity: 1 }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
        <span className="font-mono" style={{ fontSize: '6px', color: isActive ? '#FF4D4D' : '#2A2A2A', letterSpacing: '0.12em' }}>
          {isActive ? 'REC' : 'IDLE'}
        </span>
      </div>

      {/* HUD — bottom: label (active only) */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position:        'absolute',
            bottom:          0,
            left:            0,
            right:           0,
            zIndex:          5,
            backgroundColor: 'rgba(0,0,0,0.78)',
            borderTop:       '1px solid rgba(0,255,148,0.2)',
            padding:         '5px 8px',
          }}
        >
          <span className="font-mono" style={{ fontSize: '7px', color: '#00FF94', letterSpacing: '0.1em' }}>
            ► {video.label}
          </span>
        </motion.div>
      )}

      {/* Active green corner accent */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 4, pointerEvents: 'none' }}
        >
          {/* top-left corner */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '1px', backgroundColor: '#00FF94', opacity: 0.7 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '12px', backgroundColor: '#00FF94', opacity: 0.7 }} />
          {/* bottom-right corner */}
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '1px', backgroundColor: '#00FF94', opacity: 0.7 }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '1px', height: '12px', backgroundColor: '#00FF94', opacity: 0.7 }} />
        </motion.div>
      )}
    </div>
  )
}

// ── Monitor wall ──────────────────────────────────────────
function MonitorWall({ inView }: { inView: boolean }) {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % VIDEOS.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.65, ease: EASE }}
      style={{
        border:          '1px solid rgba(0,212,255,0.15)',
        backgroundColor: '#050505',
        display:         'flex',
        flexDirection:   'column',
        overflow:        'hidden',
        height:          '100%',
      }}
    >
      {/* ── Control bar ─────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0A0A0A',
          borderBottom:    '1px solid rgba(0,212,255,0.12)',
          padding:         '8px 12px',
          display:         'flex',
          alignItems:      'center',
          gap:             '10px',
          flexShrink:      0,
        }}
      >
        <motion.div
          style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF4D4D', flexShrink: 0 }}
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 0.85, repeat: Infinity }}
        />
        <span className="font-mono" style={{ fontSize: '8px', color: '#00D4FF', letterSpacing: '0.25em', flex: 1 }}>
          LIVE · CONTENT MONITORING
        </span>
        <span className="font-mono" style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
          {VIDEOS.length} FEEDS ACTIVE
        </span>
        <LiveClock />
      </div>

      {/* ── Screen rows ─────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'rgba(0,212,255,0.04)', minHeight: 0 }}>
        {/* Row 1: 2 screens */}
        <div style={{ display: 'flex', gap: '1px', flex: '2', minHeight: 0 }}>
          {VIDEOS.slice(0, 2).map((v, i) => (
            <SecurityScreen key={v.id} video={v} isActive={activeIdx === i} index={i} onClick={() => setActiveIdx(i)} />
          ))}
        </div>

        {/* Row 2: 3 screens */}
        <div style={{ display: 'flex', gap: '1px', flex: '1.5', minHeight: 0 }}>
          {VIDEOS.slice(2, 5).map((v, i) => (
            <SecurityScreen key={v.id} video={v} isActive={activeIdx === i + 2} index={i + 2} onClick={() => setActiveIdx(i + 2)} />
          ))}
        </div>

        {/* Row 3: 3 screens */}
        <div style={{ display: 'flex', gap: '1px', flex: '1.5', minHeight: 0 }}>
          {VIDEOS.slice(5, 8).map((v, i) => (
            <SecurityScreen key={v.id} video={v} isActive={activeIdx === i + 5} index={i + 5} onClick={() => setActiveIdx(i + 5)} />
          ))}
        </div>
      </div>

      {/* ── Footer bar ──────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0A0A0A',
          borderTop:       '1px solid rgba(0,212,255,0.08)',
          padding:         '7px 12px',
          display:         'flex',
          alignItems:      'center',
          gap:             '10px',
          flexShrink:      0,
        }}
      >
        <span className="font-mono" style={{ fontSize: '7px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.18em' }}>
          AUTO-ROTATE · 8s
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {VIDEOS.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                width:           activeIdx === i ? '16px' : '4px',
                height:          '4px',
                borderRadius:    '2px',
                backgroundColor: activeIdx === i ? '#00FF94' : 'rgba(255,255,255,0.15)',
                cursor:          'pointer',
                transition:      'width 0.35s ease, background-color 0.35s ease',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main export ───────────────────────────────────────────
export function Content() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })
  const ticker     = [...TOPICS, ...TOPICS].join('  ·  ')

  return (
    <section
      id="content"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: '#040404',
        paddingTop:      'clamp(40px,4.5vw,72px)',
        paddingBottom:   'clamp(40px,4.5vw,72px)',
      }}
    >
      {/* ── Section header ──────────────────────────────────── */}
      <div style={{ paddingLeft: 'clamp(48px,10vw,160px)', paddingRight: 'calc(50% + 24px)', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono" style={{ fontSize: '11px', color: '#3A3A36', letterSpacing: '0.25em' }}>//</span>
          <span className="font-mono" style={{ fontSize: '11px', color: '#3A3A36', letterSpacing: '0.25em', fontWeight: 500, textTransform: 'uppercase' }}>
            06 · CONTENT CREATOR
          </span>
          <span
            className="font-mono"
            style={{
              fontSize:        '9px',
              color:           '#FFB800',
              border:          '1px solid rgba(255,184,0,0.2)',
              backgroundColor: 'rgba(255,184,0,0.06)',
              padding:         '2px 8px',
              letterSpacing:   '0.15em',
              fontWeight:      600,
            }}
          >
            RUNNING
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
        </motion.div>

        <motion.p
          className="font-mono"
          style={{ fontSize: 'clamp(22px,3vw,38px)', color: '#E8E8E0', letterSpacing: '-0.02em', maxWidth: '560px' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
        >
          Making tech accessible.
        </motion.p>
      </div>

      {/* ── Broadcast ticker ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{
          borderTop:    '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding:      '10px 0',
          marginBottom: '40px',
          overflow:     'hidden',
          whiteSpace:   'nowrap',
        }}
      >
        <motion.span
          className="font-mono inline-block"
          style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#ffffff' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        >
          {ticker}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ticker}
        </motion.span>
      </motion.div>

      {/* ── DESKTOP: monitor wall — absolute, full section height ── */}
      <motion.div
        className="hidden lg:block"
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.65, ease: EASE }}
        style={{
          position: 'absolute',
          top:      'clamp(40px,5vw,80px)',
          right:    0,
          bottom:   'clamp(40px,5vw,80px)',
          width:    '50%',
          zIndex:   0,
        }}
      >
        <MonitorWall inView={inView} />
      </motion.div>

      {/* ── DESKTOP: channel cards — left half ─────────────────── */}
      <motion.div
        className="hidden lg:block"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.18, duration: 0.6, ease: EASE }}
        style={{
          position:     'relative',
          zIndex:       1,
          paddingLeft:  'clamp(48px,10vw,160px)',
          paddingRight: 'calc(50% + 24px)',
          marginBottom: '56px',
        }}
      >
        <p className="font-mono" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.22em', fontWeight: 700, marginBottom: '14px' }}>
          BROADCAST CHANNELS
        </p>
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '1px',
            backgroundColor:     'rgba(255,255,255,0.04)',
          }}
        >
          {CHANNELS.map((ch, i) => (
            <ChannelCard key={ch.id} ch={ch} index={i} inView={inView} />
          ))}
        </div>
      </motion.div>

      {/* ── MOBILE: channels only ───────────────────────────── */}
      <div
        className="flex flex-col lg:hidden"
        style={{
          paddingLeft:  'clamp(48px,10vw,160px)',
          paddingRight: 'clamp(48px,10vw,160px)',
          gap:          '1px',
          marginBottom: '48px',
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      >
        {CHANNELS.map((ch, i) => (
          <ChannelCard key={ch.id} ch={ch} index={i} inView={inView} />
        ))}
      </div>

      {/* ── Philosophy statement ────────────────────────────── */}
      <motion.div
        style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', position: 'relative', zIndex: 1, paddingLeft: 'clamp(48px,10vw,160px)', paddingRight: 'calc(50% + 24px)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.55, ease: EASE }}
      >
        <div style={{ width: '2px', minHeight: '56px', backgroundColor: '#FFB800', opacity: 0.4, flexShrink: 0, marginTop: '4px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p
            className="font-sans"
            style={{ fontSize: 'clamp(16px,1.8vw,20px)', color: '#E8E8E0', lineHeight: 1.5, fontStyle: 'italic' }}
          >
            "Complexity is not an obstacle.
            <br />
            It's a narrative angle."
          </p>
          <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>
            — EDITORIAL APPROACH
          </span>
        </div>
      </motion.div>
    </section>
  )
}
