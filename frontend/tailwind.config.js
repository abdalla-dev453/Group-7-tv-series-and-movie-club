/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#09090b", // Rich deep black
        "coal-border": "#27272a", // Subtle dark gray
        "coal-card": "#18181b", // Slightly lighter black for cards
        "coal-soft": "#27272a",
        amber: "#D4AF37", // Premium Gold
        "amber-soft": "#E6C669", // Lighter Gold for hover
        text: "#f4f4f5", // Soft white
        "text-dim": "#a1a1aa", // Muted silver/gray
        danger: "#ef4444",
        border: "#27272a",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 8px 30px rgba(0, 0, 0, 0.4)",
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
    },
  },
  plugins: [],
};
