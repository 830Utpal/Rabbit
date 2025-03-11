/** @type {import('tailwindcss').Config} */
export default{
  content: ["./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ], // Scan all component files
  theme: {
    extend: {}, // Customize Tailwind styles here
  },
  plugins: [],
};
