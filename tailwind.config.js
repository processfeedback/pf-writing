/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--pf-primary-color)",
        secondary: "var(--pf-secondary-color)",
        accent: "var(--pf-accent)",
        background: "var(--pf-background-color)",
        primaryText: "var(--pf-text-primary)",
      }
    },
  },
  plugins: [],
}
