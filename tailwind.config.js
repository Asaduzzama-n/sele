/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        secondary: '#333333',
        tertiary: '#757575',
        base: '#F3F3F3',
        white: '#fff',
        black: '#000',
      },
    },
  },
  plugins: [],
}