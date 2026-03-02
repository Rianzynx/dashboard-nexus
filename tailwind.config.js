/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"], 
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
      colors: {
        nexus: {
          // Dark Mode 
          dark: '#0f0f11',
          darkM: '#101011',
          offBlack: '#2b2b2c',
          pBlack: '#131316',
          
          // White Mode 
          white: '#ffffff',
          ghost: '#f8fafc',   
          softGray: '#f1f5f9', 
          muted: '#64748b',    
          border: '#e2e8f0',  
          
          // Cores de Ação
          primary: '#1e293b',
          accent: '#3b82f6',
          success: '#10b981',
          danger: '#ef4444'
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}