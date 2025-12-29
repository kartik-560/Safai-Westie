/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: "#6C5CE7",
          cyan: "#00D2D3",
        },
        secondary: "#2D3436",
        accent: "#FFD93D",
        light: "#F0F3F7",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #6C5CE7 0%, #00D2D3 100%)",
        "gradient-secondary": "linear-gradient(135deg, #00D2D3, #6C5CE7)",
      },
      boxShadow: {
        "3d": "0 20px 40px rgba(108, 92, 231, 0.15)",
        purple: "0 10px 20px rgba(108, 92, 231, 0.3)",
        "purple-hover": "0 15px 30px rgba(108, 92, 231, 0.4)",
        whatsapp: "0 15px 30px rgba(37, 211, 102, 0.4)",
      },
      transitionDuration: {
        400: "400ms",
      },
      backdropBlur: {
        glass: "15px",
      },
      animation: {
        float: "float 2s ease-in-out infinite",
        "pulse-scale": "pulse-scale 1s ease-in-out infinite",
        ripple: "ripple 1.5s ease-out",
        wave: "wave 3s ease-in-out infinite",
        "float-up": "floatUp 6s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(20px)" },
        },
        "pulse-scale": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatUp: {
          "0%": {
            transform: "translateY(0) translateX(0)",
            opacity: "0",
          },
          "10%": { opacity: "0.6" },
          "50%": {
            transform: "translateY(-50vh) translateX(20px)",
            opacity: "0.4",
          },
          "90%": { opacity: "0.2" },
          "100%": {
            transform: "translateY(-100vh) translateX(50px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
