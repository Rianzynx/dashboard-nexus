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
  				dark: '#070713',
          darkM: '#0f0f30',
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

