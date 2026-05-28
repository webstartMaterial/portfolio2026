import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        surface: '#0A0A0A',
        elevated: '#0F0F0F',
        accent: {
          DEFAULT: '#00FF94',
          dim: 'rgba(0,255,148,0.08)',
          glow: 'rgba(0,255,148,0.18)',
        },
        fg: {
          primary: '#E8E8E0',
          secondary: '#ffffff',
          ghost: '#1E1E1A',
        },
        border: {
          subtle: 'rgba(255,255,255,0.05)',
          mid: 'rgba(255,255,255,0.09)',
          strong: 'rgba(255,255,255,0.16)',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.15em' }],
      },
    },
  },
  plugins: [],
}

export default config
