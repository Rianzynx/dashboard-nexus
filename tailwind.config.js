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
  				dark: '#0f0f11',
          darkM: '#101011',
          offBlack: '#2b2b2c',
          pBlack: '#131316',
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

