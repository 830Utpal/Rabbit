/** @type {import('tailwindcss').Config} */
export default{
  content: ["./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ], // Scan all component files
  theme: {
    extend: {
      colors:{
        "rabbit-red":"#ea2e0e",
      }
    }, // Customize Tailwind styles here
  },
  plugins: [],
};
