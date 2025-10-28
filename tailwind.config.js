/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Pepper colors (Public Menu)
        pepper: {
          orange: '#ff9100',
          yellow: '#ffcc00',
          red: '#ff003c',
          green: '#0a9900',
          blue: '#0080ff',
          charcoal: '#1a1a1a',
          white: '#ffffff',
          light: '#fafafa',
          'gray-light': '#e6e6e6',
          'gray-medium': '#b3b3b3',
          'pink-light': '#fff5f7',
        },
        // Riday colors (Admin Panel)
        riday: {
          green: '#11c26d',
          blue: '#1f92c4',
        },
        // Dark theme (Riday Admin)
        dark: {
          bg: '#1a1a1a',
          sidebar: '#2d2d2d',
          card: '#232323',
          header: '#333333',
          border: '#404040',
        },
        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#a9a9a9',
          muted: '#6b7280',
          charcoal: '#1a1a1a',
        }
      },
      fontFamily: {
        'cherry-bomb': ['Cherry Bomb One', 'sans-serif'],
        'gabarito': ['Gabarito', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '250': '250ms',
      },
      boxShadow: {
        'pepper': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'pepper-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'riday': '0 2px 4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
