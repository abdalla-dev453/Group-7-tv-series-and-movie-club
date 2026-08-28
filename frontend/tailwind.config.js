/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        coal: '#0a0a08',
        'coal-border': '#1a1a17',
        'coal-card': '#15150f',
        'coal-soft': '#20201a',
        amber: '#f5b942',
        text: '#faf9f5',
        'text-dim': '#8b8977',
        danger: '#ff6b6b',
        border: '#333328',
      },
      fontFamily: {
        heading: ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        sm: '7px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
