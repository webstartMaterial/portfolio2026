'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Data ───────────────────────────────────────────────────

const COUNTRIES = [
  {
    id: 'france', name: 'FRANCE', color: '#4A9EFF', coords: '48°N · 2°E',
    // SVG point on map (viewBox 0 0 900 480)
    px: 358, py: 170,
    // Connector endpoint in SVG space (matches card edge at ~1150px container)
    cx: 208, cy: 150,
    card: { top: '3%',  left: '0',  width: '258px' },
    categories: [
      { label: 'Training Centers & Schools', items: ['AFPA', 'Web Force 3', 'Ifocop', 'Institut G4', 'La PMN', 'Web Start', 'Evogue', 'Next Formation', 'La Fonderie', 'DORANCO', 'Nais Formation', 'M2I Formation', 'Digital School', 'IIM Devinci', 'My Digital School', 'Pigier', 'Win', 'Digital College', 'Icadémie', 'Académie WS'] },
      { label: 'Startup',         items: ['Clairfy'] },
      { label: 'Agencies',        items: ['Exissia', 'Oracom Group'] },
      { label: 'ESN',             items: ['Sopra Steria'] },
    ],
  },
  {
    id: 'spain', name: 'SPAIN', color: '#00FF94', coords: '40°N · 4°W',
    px: 306, py: 223,
    cx: 176, cy: 340,
    card: { top: '60%', left: '0',  width: '218px' },
    categories: [
      { label: 'Startup', items: ['Glovo'] },
      { label: 'ESN',     items: ['Accenture', 'Sopra Steria'] },
    ],
  },
  {
    id: 'morocco', name: 'MOROCCO', color: '#FFB800', coords: '32°N · 5°W',
    px: 320, py: 292,
    cx: 194, cy: 398,
    card: { top: '74%', left: '4%', width: '200px' },
    categories: [
      { label: 'Training Center', items: ['OFPPT'] },
    ],
  },
  {
    id: 'dubai', name: 'DUBAI / UAE', color: '#00D4FF', coords: '25°N · 55°E',
    px: 612, py: 268,
    cx: 722, cy: 164,
    card: { top: '20%', right: '0', width: '224px' },
    categories: [
      { label: 'Training Centers', items: ['Morgan International', 'Octus Mindz Training', 'The Kid Space', 'Wood Wizards'] },
    ],
  },
]

function totalClients(c: typeof COUNTRIES[0]) {
  return c.categories.reduce((s, cat) => s + cat.items.length, 0)
}

// ── World Map SVG ──────────────────────────────────────────
function WorldMap({
  activeId,
  onHover,
  inView,
}: {
  activeId: string | null
  onHover: (id: string | null) => void
  inView:  boolean
}) {
  return (
    <motion.svg
      viewBox="0 0 900 480"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
      initial={{ opacity: 0, scale: 1.03 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.25, duration: 1, ease: EASE }}
    >
      <defs>
        {COUNTRIES.map(c => (
          <filter key={c.id} id={`glow-${c.id}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        ))}
        <filter id="continent-shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(0,0,0,0.4)" />
        </filter>
      </defs>

      {/* Subtle grid */}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 32} x2="900" y2={i * 32}
          stroke="rgba(255,255,255,0.022)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="480"
          stroke="rgba(255,255,255,0.022)" strokeWidth="0.5" />
      ))}
      {/* Equator hint */}
      <line x1="0" y1="310" x2="900" y2="310"
        stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 8" />

      {/* ── Continent shapes ── */}

      {/* North America coast hint */}
      <path d="M 38,118 L 128,97 L 165,144 L 149,200 L 112,250 L 55,234 L 34,178 Z"
        fill="rgba(38,38,35,0.65)" stroke="rgba(70,68,60,0.28)" strokeWidth="0.7" />

      {/* Europe main body */}
      <path d="M 354,90 L 395,83 L 440,94 L 460,120 L 452,148 L 430,165 L 412,182 L 394,196 L 373,206 L 354,212 L 337,220 L 320,204 L 325,182 L 312,163 L 322,140 Z"
        fill="rgba(42,42,38,0.88)" stroke="rgba(90,87,75,0.48)" strokeWidth="0.8"
        filter="url(#continent-shadow)" />

      {/* Iberian Peninsula (Spain) */}
      <path d="M 288,197 L 336,191 L 342,220 L 334,254 L 302,262 L 270,246 L 268,220 Z"
        fill="rgba(42,42,38,0.88)" stroke="rgba(90,87,75,0.48)" strokeWidth="0.8" />

      {/* Scandinavia */}
      <path d="M 370,64 L 395,57 L 420,72 L 418,102 L 396,115 L 373,111 Z"
        fill="rgba(38,38,35,0.72)" stroke="rgba(74,72,63,0.36)" strokeWidth="0.7" />

      {/* British Isles */}
      <path d="M 309,109 L 331,105 L 337,128 L 320,140 L 305,133 Z"
        fill="rgba(38,38,35,0.7)" stroke="rgba(72,70,62,0.34)" strokeWidth="0.6" />
      <path d="M 295,115 L 307,112 L 310,126 L 297,130 Z"
        fill="rgba(38,38,35,0.62)" stroke="rgba(70,68,60,0.28)" strokeWidth="0.5" />

      {/* Africa */}
      <path d="M 262,253 L 502,251 L 524,300 L 511,376 L 472,435 L 381,448 L 294,442 L 260,392 L 248,322 Z"
        fill="rgba(40,40,36,0.82)" stroke="rgba(86,83,71,0.42)" strokeWidth="0.8"
        filter="url(#continent-shadow)" />

      {/* Middle East land bridge */}
      <path d="M 460,213 L 548,212 L 544,283 L 512,334 L 480,311 L 462,257 Z"
        fill="rgba(40,40,36,0.78)" stroke="rgba(83,80,69,0.38)" strokeWidth="0.7" />

      {/* Arabian Peninsula / UAE */}
      <path d="M 544,213 L 623,213 L 671,244 L 668,313 L 625,357 L 568,330 L 540,280 Z"
        fill="rgba(42,42,38,0.85)" stroke="rgba(90,87,75,0.44)" strokeWidth="0.8" />

      {/* South Asia hint */}
      <path d="M 671,236 L 723,240 L 736,300 L 713,354 L 675,380 L 654,332 L 663,272 Z"
        fill="rgba(36,36,33,0.63)" stroke="rgba(68,66,58,0.28)" strokeWidth="0.7" />

      {/* East Asia hint */}
      <path d="M 733,96 L 822,93 L 872,140 L 863,213 L 803,234 L 738,220 L 720,170 Z"
        fill="rgba(34,34,31,0.58)" stroke="rgba(66,64,56,0.25)" strokeWidth="0.6" />

      {/* SE Asia hint */}
      <path d="M 768,248 L 828,240 L 854,278 L 836,320 L 790,328 L 764,294 Z"
        fill="rgba(33,33,31,0.52)" stroke="rgba(64,62,54,0.22)" strokeWidth="0.5" />

      {/* ── Connector lines (dashed) ── */}
      {COUNTRIES.map((c, i) => (
        <motion.path
          key={`line-${c.id}`}
          d={`M ${c.px},${c.py} C ${(c.px * 0.6 + c.cx * 0.4)},${c.py} ${(c.px * 0.4 + c.cx * 0.6)},${c.cy} ${c.cx},${c.cy}`}
          stroke={c.color}
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          style={{ opacity: activeId === null || activeId === c.id ? (activeId === c.id ? 0.8 : 0.3) : 0.15, transition: 'opacity 0.25s' }}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 0.8 + i * 0.2, duration: 1, ease: 'linear' }}
        />
      ))}

      {/* ── Country indicator points ── */}
      {COUNTRIES.map((c, i) => {
        const isActive = activeId === c.id
        return (
          <g
            key={`pt-${c.id}`}
            onMouseEnter={() => onHover(c.id)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: 'default' }}
          >
            {/* Entry reveal wrapper */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
            >
              {/* Pulsing outer ring */}
              <motion.circle
                cx={c.px} cy={c.py}
                fill="none" stroke={c.color} strokeWidth="0.8"
                animate={{ r: [7, 22, 7], opacity: [0.45, 0, 0.45] }}
                transition={{ repeat: Infinity, duration: 2.8, delay: i * 0.55, ease: 'easeOut' }}
              />
              {/* Inner dot — regular circle with CSS hover transition */}
              <circle
                cx={c.px} cy={c.py}
                r={isActive ? 6 : 4}
                fill={c.color}
                opacity={isActive ? 1 : 0.75}
                filter={`url(#glow-${c.id})`}
                style={{ transition: 'r 0.2s, opacity 0.2s' }}
              />
            </motion.g>

            {/* Coordinate label */}
            <text
              x={c.px + 10} y={c.py - 8}
              fill={c.color}
              fontSize="7.5"
              fontFamily="monospace"
              style={{ opacity: isActive ? 0.9 : 0.3, transition: 'opacity 0.2s' }}
            >
              {c.coords}
            </text>
          </g>
        )
      })}
    </motion.svg>
  )
}

// ── Country card (desktop) ─────────────────────────────────
function CountryCard({
  country: c,
  index,
  isActive,
  onHover,
  inView,
}: {
  country:  typeof COUNTRIES[0]
  index:    number
  isActive: boolean
  onHover:  (id: string | null) => void
  inView:   boolean
}) {
  const total = totalClients(c)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.9 + index * 0.15, duration: 0.5, ease: EASE }}
      onMouseEnter={() => onHover(c.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        position:        'absolute' as const,
        ...c.card,
        backgroundColor: isActive ? 'rgba(12,12,12,0.97)' : 'rgba(6,6,6,0.92)',
        border:          `1px solid ${isActive ? c.color + '45' : 'rgba(255,255,255,0.09)'}`,
        backdropFilter:  'blur(16px)',
        boxShadow:       isActive
          ? `0 0 40px ${c.color}14, 0 8px 40px rgba(0,0,0,0.65)`
          : '0 4px 24px rgba(0,0,0,0.45)',
        transform:       isActive ? 'translateY(-4px)' : 'translateY(0)',
        transition:      'background-color 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.25s',
        overflow:        'hidden',
        cursor:          'default',
        zIndex:          isActive ? 20 : 2,
      }}
    >
      {/* Accent top line */}
      <div style={{
        height:          '2px',
        backgroundColor: c.color,
        opacity:         isActive ? 1 : 0.38,
        transition:      'opacity 0.25s',
      }} />

      <div style={{ padding: '12px 14px 16px' }}>

        {/* Country header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            {/* Pulsing indicator dot */}
            <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', flexShrink: 0 }}>
              <motion.span
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: c.color, opacity: 0.3 }}
                animate={{ scale: [1, 1.9, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              />
              <span style={{ position: 'relative', margin: 'auto', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: c.color }} />
            </span>
            <span className="font-mono" style={{ fontSize: '11px', color: '#E8E8E0', fontWeight: 700, letterSpacing: '0.1em' }}>
              {c.name}
            </span>
          </div>
          <span className="font-mono" style={{
            fontSize:        '9px',
            color:           c.color,
            border:          `1px solid ${c.color}30`,
            backgroundColor: `${c.color}08`,
            padding:         '2px 6px',
            letterSpacing:   '0.08em',
          }}>
            {total}
          </span>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          {c.categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 + index * 0.12 + ci * 0.07, duration: 0.4 }}
            >
              <p className="font-mono" style={{
                fontSize:      '8px',
                color:         c.color,
                opacity:       isActive ? 0.75 : 0.45,
                letterSpacing: '0.18em',
                fontWeight:    700,
                marginBottom:  '5px',
                textTransform: 'uppercase',
                transition:    'opacity 0.25s',
              }}>
                {cat.label}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                {cat.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    className="font-mono"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.15 + index * 0.12 + ci * 0.07 + ii * 0.025, duration: 0.3 }}
                    style={{
                      fontSize:        '8.5px',
                      color:           isActive ? c.color : '#ffffff',
                      border:          `1px solid ${isActive ? c.color + '35' : 'rgba(255,255,255,0.07)'}`,
                      backgroundColor: isActive ? `${c.color}08` : 'transparent',
                      padding:         '2px 6px',
                      letterSpacing:   '0.05em',
                      transition:      'color 0.22s, border-color 0.22s, background-color 0.22s',
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  )
}

// ── Mobile card ────────────────────────────────────────────
function MobileCountryCard({ country: c, index, inView }: {
  country: typeof COUNTRIES[0]; index: number; inView: boolean
}) {
  const [open, setOpen] = useState(index === 0)
  const total = totalClients(c)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.45, ease: EASE }}
      style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}` }} />
          <span className="font-mono" style={{ fontSize: '13px', color: open ? '#E8E8E0' : '#ffffff', fontWeight: 700, letterSpacing: '0.08em' }}>
            {c.name}
          </span>
          <span className="font-mono" style={{ fontSize: '9px', color: c.color, opacity: 0.6, letterSpacing: '0.1em' }}>
            {c.coords}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="font-mono" style={{ fontSize: '9px', color: c.color, border: `1px solid ${c.color}30`, padding: '2px 6px' }}>
            {total}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.22 }}
            className="font-mono"
            style={{ color: c.color, fontSize: '18px', lineHeight: 1 }}
          >
            +
          </motion.span>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '20px' }}>
          {c.categories.map(cat => (
            <div key={cat.label}>
              <p className="font-mono" style={{ fontSize: '9px', color: c.color, opacity: 0.6, letterSpacing: '0.18em', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                {cat.label}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {cat.items.map(item => (
                  <span key={item} className="font-mono" style={{ fontSize: '9px', color: '#ffffff', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 8px', letterSpacing: '0.05em' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main export ────────────────────────────────────────────
export function TrustNetwork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })
  const [activeId, setActiveId] = useState<string | null>(null)

  const totalOrgs = COUNTRIES.reduce((s, c) => s + totalClients(c), 0)

  return (
    <section
      id="trust"
      ref={sectionRef}
      style={{
        position:      'relative',
        width:         '100%',
        backgroundColor: '#030303',
        paddingTop:    'clamp(80px,9vw,144px)',
        paddingBottom: 'clamp(80px,9vw,144px)',
        paddingLeft:   'clamp(48px,10vw,160px)',
        paddingRight:  'clamp(48px,10vw,160px)',
        overflow:      'hidden',
      }}
    >
      {/* Section strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1, marginBottom: '48px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="font-mono" style={{ fontSize: '11px', color: '#3A3A36', letterSpacing: '0.25em' }}>//</span>
          <span className="font-mono" style={{ fontSize: '11px', color: '#3A3A36', letterSpacing: '0.25em', fontWeight: 500, textTransform: 'uppercase' }}>
            09 · NETWORK
          </span>
          <span className="font-mono" style={{
            fontSize: '9px', color: '#00FF94',
            border: '1px solid rgba(0,255,148,0.25)',
            backgroundColor: 'rgba(0,255,148,0.06)',
            padding: '2px 8px', letterSpacing: '0.15em', fontWeight: 600,
          }}>
            VERIFIED
          </span>
          <span className="font-mono" style={{ fontSize: '9px', color: '#ffffff', letterSpacing: '0.12em' }}>
            {totalOrgs} ORGANIZATIONS · 4 COUNTRIES
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
        </div>
      </motion.div>

      {/* Title block */}
      <motion.div
        style={{ position: 'relative', zIndex: 1, marginBottom: '12px' }}
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
      >
        <h2 className="font-mono font-bold" style={{
          fontSize:      'clamp(22px, 3vw, 38px)',
          color:         '#E8E8E0',
          letterSpacing: '-0.02em',
          lineHeight:    1.1,
          maxWidth:      '680px',
        }}>
          TRUSTED BY INSTITUTIONS,<br />
          <span style={{ color: '#4A9EFF' }}>STARTUPS & COMPANIES</span>
        </h2>
      </motion.div>

      <motion.p
        className="font-sans"
        style={{
          fontSize:     '13px',
          color:        '#ffffff',
          lineHeight:   1.7,
          maxWidth:     '520px',
          marginBottom: '48px',
          position:     'relative',
          zIndex:       1,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        A global trust network across training centers, schools, startups, agencies and tech companies.
      </motion.p>

      {/* ── DESKTOP: Map + absolute cards ─────────────────── */}
      <div
        className="hidden lg:block"
        style={{ position: 'relative', height: '580px', zIndex: 1 }}
      >
        <WorldMap activeId={activeId} onHover={setActiveId} inView={inView} />

        {COUNTRIES.map((c, i) => (
          <CountryCard
            key={c.id}
            country={c}
            index={i}
            isActive={activeId === c.id}
            onHover={setActiveId}
            inView={inView}
          />
        ))}

        {/* Corner coordinates (Terminal UI feel) */}
        <div style={{ position: 'absolute', bottom: 8, left: 8, zIndex: 5 }}>
          <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.15em' }}>
            NETWORK·SCOPE · GLOBAL
          </span>
        </div>
        <div style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 5 }}>
          <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.15em' }}>
            FR · ES · MA · AE
          </span>
        </div>
      </div>

      {/* ── MOBILE: accordion stack ────────────────────────── */}
      <div
        className="flex flex-col lg:hidden"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Faint map texture on mobile */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(74,158,255,0.06) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
          opacity: 0.5,
        }} />

        {/* Country cards */}
        {COUNTRIES.map((c, i) => (
          <MobileCountryCard key={c.id} country={c} index={i} inView={inView} />
        ))}
      </div>

    </section>
  )
}
