'use client'

type IconProps = { size?: number; color?: string; strokeWidth?: number }
const base = (size = 22, strokeWidth = 1.4) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
})

export function IconBrain({ size, color = '#00FF94', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3.5 3.5 0 0 0 2.5 5.5A3 3 0 0 0 9 20a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3.5 3.5 0 0 1-2.5 5.5A3 3 0 0 1 15 20a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" />
    </svg>
  )
}

export function IconMicrosoft({ size, strokeWidth }: IconProps) {
  const s = size ?? 22
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2"  y="2"  width="9.5" height="9.5" fill="#00D4FF" opacity="0.9" />
      <rect x="12.5" y="2"  width="9.5" height="9.5" fill="#00FF94" opacity="0.9" />
      <rect x="2"  y="12.5" width="9.5" height="9.5" fill="#FFB800" opacity="0.9" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#4A9EFF" opacity="0.9" />
    </svg>
  )
}

export function IconFinance({ size, color = '#FFB800', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <path d="M3 20h18" />
      <path d="M6 20V10M11 20V4M16 20v-7M21 20v-3" />
      <path d="m4 8 5-4 4 3 6-5" />
    </svg>
  )
}

export function IconCode({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
    </svg>
  )
}

export function IconCoffee({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <path d="M4 9h13a3 3 0 0 1 0 6h-1" />
      <path d="M4 9v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V9" />
      <path d="M8 3c-.5 1 -.5 1.5 0 2.5M12 3c-.5 1 -.5 1.5 0 2.5" />
    </svg>
  )
}

export function IconTerminal({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="m7 9 3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  )
}

export function IconServer({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <rect x="3" y="4" width="18" height="6" rx="1" />
      <rect x="3" y="14" width="18" height="6" rx="1" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  )
}

export function IconDatabase({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  )
}

export function IconChart({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <path d="M4 19h16" />
      <rect x="6" y="12" width="3" height="7" />
      <rect x="11" y="7" width="3" height="12" />
      <rect x="16" y="14" width="3" height="5" />
    </svg>
  )
}

export function IconGraduation({ size, color = '#00FF94', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <path d="m2 9 10-5 10 5-10 5Z" />
      <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
      <path d="M22 9v6" />
    </svg>
  )
}

export function IconPlay({ size, color = '#ffffff', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="m10 9 5 3-5 3Z" fill={color} stroke={color} strokeLinejoin="round" />
    </svg>
  )
}

export function IconShield({ size, color = '#00D4FF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconGlobe({ size, color = '#ffffff', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.8 2.6 4.2 5.7 4.2 9s-1.4 6.4-4.2 9c-2.8-2.6-4.2-5.7-4.2-9s1.4-6.4 4.2-9Z" />
    </svg>
  )
}

export function IconPin({ size, color = '#ffffff', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

export function IconMobile({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M10 18h4" />
    </svg>
  )
}

export function IconGit({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="9" r="2.5" />
      <path d="M6 8.5V15.5" />
      <path d="M6 8.5c0 4 3 5 8 5.5" />
      <path d="M18 11.5V13" />
    </svg>
  )
}

export function IconLayout({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
    </svg>
  )
}

export function IconKanban({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M9 4v16M15 4v10" />
    </svg>
  )
}

export function IconSparkle({ size, color = '#4A9EFF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke={color}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m12 7 1.8 3.2L17 12l-3.2 1.8L12 17l-1.8-3.2L7 12l3.2-1.8Z" />
    </svg>
  )
}

export function IconStar({ size, color = '#00D4FF', strokeWidth }: IconProps) {
  const s = size ?? 22
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={color} stroke="none">
      <path d="M12 2.5 15.09 9l7.16.63-5.41 4.72 1.64 7.02L12 17.77l-6.48 3.6 1.64-7.02L1.75 9.63 8.91 9 12 2.5Z" />
    </svg>
  )
}

export function IconQuote({ size, color = '#00D4FF', strokeWidth }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} stroke="none" fill={color}>
      <path d="M4 8c0-2.5 1.8-4.5 4.5-5l.5 1.6C7.3 5.2 6.4 6.3 6.2 7.5c1.7.2 3 1.6 3 3.3A3.2 3.2 0 0 1 6 14a3.6 3.6 0 0 1-2-6Z" />
      <path d="M13.5 8c0-2.5 1.8-4.5 4.5-5l.5 1.6c-1.7.6-2.6 1.7-2.8 2.9 1.7.2 3 1.6 3 3.3a3.2 3.2 0 0 1-3.2 3.2 3.6 3.6 0 0 1-2-6Z" />
    </svg>
  )
}

const ICON_MAP: Record<string, (p: IconProps) => React.JSX.Element> = {
  code: IconCode, coffee: IconCoffee, terminal: IconTerminal, server: IconServer, database: IconDatabase, chart: IconChart,
  git: IconGit, layout: IconLayout, kanban: IconKanban, sparkle: IconSparkle, mobile: IconMobile,
}

export function DevIcon({ id, size, color }: { id: string; size?: number; color?: string }) {
  const Cmp = ICON_MAP[id] ?? IconCode
  return <Cmp size={size} color={color} />
}
