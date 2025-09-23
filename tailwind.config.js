/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // Next.js app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // Next.js pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // Components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
