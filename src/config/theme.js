// Professional Theme Configuration for Solstice DeFi Platform

export const theme = {
  // Brand Colors
  colors: {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6', // Main brand color
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    accent: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    }
  },

  // Spacing Scale
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Box Shadow
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
    glow: '0 0 20px rgb(20 184 166 / 0.4)',
    'glow-lg': '0 0 40px rgb(20 184 166 / 0.6)',
    'glow-primary': '0 0 20px rgb(59 130 246 / 0.4)',
    'glow-secondary': '0 0 20px rgb(217 70 239 / 0.4)',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
    secondary: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    tertiary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    hero: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #0f172a 100%)',
    card: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    text: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #8b5cf6 100%)',
    aurora: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff)',
    sunset: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ocean: 'linear-gradient(135deg, #667db6 0%, #0082c8 25%, #0052d4 50%, #00c9ff 100%)',
  },

  // Animations & Transitions
  animation: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    timingFunction: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(30px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeInDown: {
        '0%': { opacity: '0', transform: 'translateY(-30px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      slideInLeft: {
        '0%': { opacity: '0', transform: 'translateX(-30px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      slideInRight: {
        '0%': { opacity: '0', transform: 'translateX(30px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      scaleIn: {
        '0%': { opacity: '0', transform: 'scale(0.8)' },
        '100%': { opacity: '1', transform: 'scale(1)' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.5' },
      },
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      bounce: {
        '0%, 100%': { 
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
        },
        '50%': { 
          transform: 'translateY(0)',
          animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
        },
      },
      shimmer: {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' },
      },
      glow: {
        '0%, 100%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.2)' },
        '50%': { boxShadow: '0 0 40px rgba(20, 184, 166, 0.6)' },
      },
    }
  },

  // Breakpoints
  screens: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    'modal-backdrop': '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
    toast: '1080',
  },

  // Glass Effects
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdrop: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdrop: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdrop: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.2)',
      backdrop: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }
  },

  // Component Variants
  components: {
    button: {
      primary: {
        background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
        color: '#ffffff',
        hover: {
          transform: 'translateY(-2px)',
          boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)',
        }
      },
      secondary: {
        background: 'transparent',
        color: '#14b8a6',
        border: '2px solid #14b8a6',
        hover: {
          background: '#14b8a6',
          color: '#ffffff',
        }
      },
      ghost: {
        background: 'transparent',
        color: '#cbd5e1',
        hover: {
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#f1f5f9',
        }
      }
    },
    card: {
      default: {
        background: 'rgba(255, 255, 255, 0.05)',
        backdrop: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
      },
      premium: {
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdrop: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '1.5rem',
      },
      feature: {
        background: 'rgba(255, 255, 255, 0.03)',
        backdrop: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '0.75rem',
      }
    }
  }
};

// Utility functions
export const getColor = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], theme.colors);
};

export const getSpacing = (value) => {
  return theme.spacing[value] || value;
};

export const getGradient = (name) => {
  return theme.gradients[name] || name;
};

export const getGlass = (variant = 'light') => {
  return theme.glass[variant] || theme.glass.light;
};

export default theme;
