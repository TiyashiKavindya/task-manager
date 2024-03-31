/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#181818',
        'dark-light': '#212121',
        'light': '#ffffff',
        'primary': '#10b981',

      }
    },
  },
  plugins: [],
}

