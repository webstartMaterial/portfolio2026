'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Status = 'idle' | 'sending' | 'sent'

// ── Terminal input ─────────────────────────────────────────
function TerminalInput({
  prefix,
  type      = 'text',
  placeholder,
  value,
  onChange,
  multiline = false,
  disabled  = false,
}: {
  prefix:      string
  type?:       string
  placeholder: string
  value:       string
  onChange:    (v: string) => void
  multiline?:  boolean
  disabled?:   boolean
}) {
  const [focused, setFocused] = useState(false)

  const sharedStyle: React.CSSProperties = {
    background:    'transparent',
    border:        'none',
    outline:       'none',
    color:         '#E8E8E0',
    fontFamily:    'var(--font-mono)',
    fontSize:      '13px',
    letterSpacing: '0.02em',
    width:         '100%',
    resize:        'none' as const,
    padding:       '0',
    caretColor:    '#00FF94',
  }

  return (
    <div
      style={{
        border:          `1px solid ${focused ? 'rgba(0,255,148,0.35)' : 'rgba(255,255,255,0.07)'}`,
        backgroundColor: focused ? 'rgba(0,255,148,0.02)' : '#0A0A0A',
        boxShadow:       focused ? '0 0 0 3px rgba(0,255,148,0.04)' : 'none',
        padding:         '14px 16px',
        display:         'flex',
        alignItems:      multiline ? 'flex-start' : 'center',
        gap:             '12px',
        transition:      'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
      }}
    >
      <span
        className="font-mono flex-shrink-0"
        style={{
          fontSize:      '11px',
          color:         focused ? '#00FF94' : '#ffffff',
          letterSpacing: '0.1em',
          transition:    'color 0.2s',
          paddingTop:    multiline ? '2px' : '0',
        }}
      >
        {prefix}
      </span>
      {multiline ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, lineHeight: 1.7 }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
      {!multiline && focused && (
        <motion.span
          style={{ width: '1px', height: '14px', backgroundColor: '#00FF94', flexShrink: 0 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
      )}
    </div>
  )
}

// ── Main section ───────────────────────────────────────────
export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<Status>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message || status !== 'idle') return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1800)
  }

  const disabled = status !== 'idle'

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-36 overflow-hidden"
      style={{
        paddingTop:    'clamp(40px,4.5vw,72px)',
        overflow:      'hidden',
      }}
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
            11 · CONTACT
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span
            className="font-mono text-[9px] px-3 py-1 tracking-[0.2em]"
            style={{ color: '#00FF94', border: '1px solid rgba(0,255,148,0.2)', backgroundColor: 'rgba(0,255,148,0.06)' }}
          >
            AVAILABLE
          </span>
        </motion.div>

        {/* ── Headline ─────────────────────────────────── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
        >
          <p
            className="font-mono"
            style={{ fontSize: 'clamp(22px,3vw,38px)', color: '#E8E8E0', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '16px' }}
          >
            <span style={{ color: '#00FF94' }}>{'>'}</span> Initiate a connection
            <motion.span
              style={{ color: '#00FF94' }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
            >
              _
            </motion.span>
          </p>
          <p
            className="font-sans"
            style={{ fontSize: 'clamp(14px,1.4vw,16px)', color: '#ffffff', lineHeight: 1.6, maxWidth: '480px' }}
          >
            You have a project, a training need, an idea.
            <br />
            Let's build it together.
          </p>
        </motion.div>

        {/* ── Two-col layout ────────────────────────────── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,340px)',
            gap:                 '1px',
            background:          'rgba(255,255,255,0.04)',
            marginBottom:        '0',
          }}
          className="flex-col-on-mobile"
        >
          {/* ── Form col ─────────────────────────────── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55, ease: EASE }}
            style={{
              backgroundColor: '#0A0A0A',
              padding:         'clamp(28px,4vw,48px)',
              display:         'flex',
              flexDirection:   'column',
              gap:             '12px',
            }}
          >
            <TerminalInput
              prefix="$ IDENT:"
              placeholder="your name"
              value={name}
              onChange={setName}
              disabled={disabled}
            />
            <TerminalInput
              prefix="$ ADDR: "
              type="email"
              placeholder="your email"
              value={email}
              onChange={setEmail}
              disabled={disabled}
            />
            <TerminalInput
              prefix="$ MSG:  "
              placeholder="describe your project, idea or request…"
              value={message}
              onChange={setMessage}
              multiline
              disabled={disabled}
            />

            {/* Submit */}
            <div style={{ marginTop: '8px' }}>
              <motion.button
                type="submit"
                disabled={disabled || !name || !email || !message}
                whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                style={{
                  backgroundColor: status === 'sent' ? 'rgba(0,255,148,0.12)' : status === 'sending' ? 'transparent' : 'transparent',
                  border:          `1px solid ${status === 'sent' ? 'rgba(0,255,148,0.5)' : 'rgba(0,255,148,0.3)'}`,
                  color:           status === 'sent' ? '#00FF94' : '#00FF94',
                  fontFamily:      'var(--font-mono)',
                  fontSize:        '11px',
                  letterSpacing:   '0.2em',
                  padding:         '14px 32px',
                  cursor:          disabled || !name || !email || !message ? 'not-allowed' : 'pointer',
                  opacity:         !name || !email || !message ? 0.4 : 1,
                  transition:      'background-color 0.2s, border-color 0.2s, opacity 0.2s',
                  display:         'flex',
                  alignItems:      'center',
                  gap:             '10px',
                }}
              >
                {status === 'idle' && '[ SEND_REQUEST ]'}
                {status === 'sending' && (
                  <>
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                    >
                      SENDING
                    </motion.span>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{ display: 'inline-block', fontSize: '12px' }}
                    >
                      ◌
                    </motion.span>
                  </>
                )}
                {status === 'sent' && '[ REQUEST_SENT ✓ ]'}
              </motion.button>

              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono"
                  style={{ fontSize: '10px', color: '#00FF94', letterSpacing: '0.15em', marginTop: '10px', opacity: 0.7 }}
                >
                  {'>'} Message received. Response within 24h.
                </motion.p>
              )}
            </div>
          </motion.form>

          {/* ── Sidebar col ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.55, ease: EASE }}
            style={{
              backgroundColor: '#080808',
              padding:         'clamp(28px,4vw,48px)',
              display:         'flex',
              flexDirection:   'column',
              gap:             '28px',
            }}
          >
            {/* Status */}
            <div>
              <span className="font-mono" style={{ fontSize: '9px', color: '#ffffff', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                STATUS
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00FF94', display: 'inline-block' }} />
                <span className="font-mono" style={{ fontSize: '12px', color: '#00FF94', letterSpacing: '0.1em' }}>
                  AVAILABLE
                </span>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />

            {/* Email */}
            <div>
              <span className="font-mono" style={{ fontSize: '9px', color: '#ffffff', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                EMAIL
              </span>
              <a
                href="mailto:samih.habbani@gmail.com"
                className="font-mono"
                style={{ fontSize: '12px', color: '#C8C8C0', letterSpacing: '0.04em', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00FF94')}
                onMouseLeave={e => (e.currentTarget.style.color = '#C8C8C0')}
              >
                samih.habbani@gmail.com
              </a>
            </div>

            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />

            {/* Links */}
            <div>
              <span className="font-mono" style={{ fontSize: '9px', color: '#ffffff', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>
                LINKS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/samih-habbani' },
                  { label: 'GitHub',   href: 'https://github.com/samihhabbani' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono"
                    style={{
                      fontSize:      '11px',
                      color:         '#ffffff',
                      letterSpacing: '0.1em',
                      textDecoration:'none',
                      display:       'flex',
                      alignItems:    'center',
                      gap:           '8px',
                      transition:    'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E8E8E0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
                  >
                    <span style={{ color: '#ffffff', fontSize: '10px' }}>↗</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />

            {/* Location */}
            <div>
              <span className="font-mono" style={{ fontSize: '9px', color: '#ffffff', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                LOCATION
              </span>
              <span className="font-mono" style={{ fontSize: '12px', color: '#ffffff', letterSpacing: '0.05em' }}>
                Dubai / Remote
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{
          marginTop:    '80px',
          borderTop:    '1px solid rgba(255,255,255,0.05)',
          padding:      'clamp(20px,3vw,32px) clamp(48px,10vw,160px)',
          display:      'flex',
          alignItems:   'center',
          justifyContent:'space-between',
          gap:          '16px',
          flexWrap:     'wrap',
        }}
      >
        <span className="font-mono" style={{ fontSize: '10px', color: '#ffffff', letterSpacing: '0.2em' }}>
          © 2026 SAMIH HABBANI
        </span>
        <span className="font-mono" style={{ fontSize: '10px', color: '#ffffff', letterSpacing: '0.15em' }}>
          Hello World · v1.0.0
        </span>
        <span className="font-mono" style={{ fontSize: '10px', color: '#ffffff', letterSpacing: '0.15em' }}>
          BUILT WITH NEXT.JS · FRAMER MOTION
        </span>
      </motion.footer>
    </section>
  )
}
