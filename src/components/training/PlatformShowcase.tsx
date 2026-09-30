'use client'

import { motion } from 'framer-motion'

const COURSES = [
  { title: 'Web Development', progress: 82, color: '#00FF94' },
  { title: 'Generative AI',   progress: 64, color: '#00D4FF' },
  { title: 'Digital Marketing', progress: 45, color: '#FFB800' },
]

export function PlatformShowcase() {
  return (
    <div style={{ border: '1px solid rgba(0,255,148,0.15)', backgroundColor: '#050505', overflow: 'hidden' }}>
      {/* Browser chrome */}
      <div style={{ backgroundColor: '#0A0A0A', borderBottom: '1px solid rgba(0,255,148,0.12)', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#FF5F56', display: 'inline-block' }} />
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#FFBD2E', display: 'inline-block' }} />
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#27C93F', display: 'inline-block' }} />
        </div>
        <div style={{ flex: 1, backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '3px', padding: '3px 10px' }}>
          <span className="font-mono" style={{ fontSize: '9px', color: '#00FF94', letterSpacing: '0.04em' }}>
            🔒 academiews.com
          </span>
        </div>
      </div>

      {/* Abstract dashboard mockup */}
      <div style={{ display: 'grid', gridTemplateColumns: '84px 1fr', minHeight: '260px' }}>
        {/* Sidebar */}
        <div style={{ backgroundColor: '#080808', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '4px', backgroundColor: 'rgba(0,255,148,0.15)', border: '1px solid rgba(0,255,148,0.3)', marginBottom: '10px' }} />
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ height: '6px', width: i === 1 ? '80%' : '55%', backgroundColor: i === 1 ? 'rgba(0,255,148,0.5)' : 'rgba(255,255,255,0.08)', borderRadius: '2px' }} />
          ))}
        </div>

        {/* Main content */}
        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ height: '9px', width: '45%', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '2px' }} />
          {COURSES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{ border: '1px solid rgba(255,255,255,0.07)', backgroundColor: '#0A0A0A', padding: '10px 12px' }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: '#E8E8E0' }}>{c.title}</span>
                <span className="font-mono" style={{ fontSize: '9px', color: c.color }}>{c.progress}%</span>
              </div>
              <div style={{ height: '4px', width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', backgroundColor: c.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
