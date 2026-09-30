'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Same verified, real videos already published on the homepage's Content Creator section.
const VIDEOS = [
  { id: '7u4XMDUWzlY', cam: 'CAM_01', label: 'AI Tools & Productivity', start: 0  },
  { id: 'CQF5bf6z0jE', cam: 'CAM_02', label: 'Dev Workflow',            start: 18 },
  { id: 'ygAuD83FAeA', cam: 'CAM_03', label: 'Tech Tutorial',           start: 50 },
  { id: '9RgIzfN9aLI', cam: 'CAM_04', label: 'Workshop Session',        start: 0  },
  { id: '8BAMQ0CSm7w', cam: 'CAM_05', label: 'Course Preview',          start: 0  },
  { id: 'quyVgEzThOU', cam: 'CAM_06', label: 'Live Demo',               start: 1  },
]

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

function VideoTile({ video, isActive, shouldLoad, index, onClick }: { video: typeof VIDEOS[number]; isActive: boolean; shouldLoad: boolean; index: number; onClick: () => void }) {
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&disablekb=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&fs=0${video.start > 0 ? `&start=${video.start}` : ''}`

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative', aspectRatio: '16/10', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#000',
        border: `1px solid ${isActive ? 'rgba(0,255,148,0.5)' : 'rgba(0,212,255,0.1)'}`,
        boxShadow: isActive ? '0 0 18px rgba(0,255,148,0.12), inset 0 0 30px rgba(0,255,148,0.04)' : 'none',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
    >
      {shouldLoad && isActive && (
        <iframe
          title={video.label}
          src={embedUrl}
          loading="lazy"
          style={{ position: 'absolute', top: '-10%', left: '-5%', width: '110%', height: '120%', border: 0, pointerEvents: 'none' }}
          allow="autoplay; encrypted-media"
        />
      )}
      <div
        style={{
          position: 'absolute', inset: 0, backgroundImage: `url(${thumbUrl})`, backgroundSize: 'cover', backgroundPosition: 'center',
          filter: isActive ? 'none' : 'grayscale(0.55) brightness(0.5)', opacity: isActive ? 0 : 1, transition: 'opacity 0.6s ease, filter 0.4s ease',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      <div
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)' }}
      />

      <div style={{ position: 'absolute', top: 6, left: 7, zIndex: 5 }}>
        <span className="font-mono" style={{ fontSize: '7px', color: isActive ? '#00FF94' : '#00D4FF', letterSpacing: '0.15em', opacity: isActive ? 1 : 0.7 }}>
          {video.cam}
        </span>
      </div>
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
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5, backgroundColor: 'rgba(0,0,0,0.78)', borderTop: '1px solid rgba(0,255,148,0.2)', padding: '5px 8px' }}
        >
          <span className="font-mono" style={{ fontSize: '7px', color: '#00FF94', letterSpacing: '0.1em' }}>► {video.label}</span>
        </motion.div>
      )}
    </div>
  )
}

export function VideoWall() {
  const [activeIdx, setActiveIdx] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => setActiveIdx(prev => (prev + 1) % VIDEOS.length), 7000)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <div ref={ref} style={{ border: '1px solid rgba(0,212,255,0.15)', backgroundColor: '#050505', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#0A0A0A', borderBottom: '1px solid rgba(0,212,255,0.12)', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <motion.div
          style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF4D4D', flexShrink: 0 }}
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 0.85, repeat: Infinity }}
        />
        <span className="font-mono" style={{ fontSize: '8px', color: '#00D4FF', letterSpacing: '0.2em', flex: 1 }}>LIVE · VIDEO FEED</span>
        <span className="font-mono" style={{ fontSize: '7px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{VIDEOS.length} FEEDS</span>
        <LiveClock />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: 'rgba(0,212,255,0.04)' }}>
        {VIDEOS.map((v, i) => (
          <VideoTile key={v.id} video={v} isActive={activeIdx === i} shouldLoad={inView} index={i} onClick={() => setActiveIdx(i)} />
        ))}
      </div>
    </div>
  )
}
