/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8ecf2',
          100: '#c5d1e0',
          200: '#9fb3cb',
          300: '#7895b6',
          400: '#5b7ea6',
          500: '#3d6796',
          600: '#375f8e',
          700: '#2f5483',
          800: '#274a79',
          900: '#1a3868',
          DEFAULT: '#203d64',
          dark: '#203d64',
          light: '#3d6796',
        },
        cofre: {
          blue: '#203d64',
          blueLight: '#3d6796',
          blueBright: '#1e40af', // Azul vibrante para banners (ajustado para corresponder à imagem)
          gray: '#333333',
          grayLight: '#666666',
          grayBorder: '#e0e0e0',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
