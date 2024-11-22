/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CD4B4B',
          50: '#FDF6F6',
          100: '#F9E4E4',
          200: '#F0BABA',
          300: '#E69090',
          400: '#DC6666',
          500: '#CD4B4B',
          600: '#B53232',
          700: '#882626',
          800: '#5B1919',
          900: '#2E0D0D',
        },
        secondary: {
          DEFAULT: '#96C5B0',
          50: '#F7FAF9',
          100: '#E8F1ED',
          200: '#CCE2D9',
          300: '#B1D3C5',
          400: '#96C5B0',
          500: '#70AD93',
          600: '#528E73',
          700: '#3E6B56',
          800: '#29473A',
          900: '#15241D',
        },
        accent: {
          DEFAULT: '#4BA3CD',
          50: '#F6FAFC',
          100: '#E4F1F7',
          200: '#BAE0EC',
          300: '#90CEE2',
          400: '#66BDD7',
          500: '#4BA3CD',
          600: '#3288B5',
          700: '#266688',
          800: '#19445B',
          900: '#0D222E',
        },
        cream: '#F5F1E3',
        teal: '#2B5D5A',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}