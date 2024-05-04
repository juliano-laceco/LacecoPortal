/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "#dc2625",
        "darkgrey": "#4b5563",
        "bg-primary": "#ef4545",
        "primary-b": "#f57274",
        "bg-primary-h": "#ea767b",
        "bg-secondary": "#ccd3d5",
        "secondary-b": "#777571",
        "bg-secondary-h": "#a5a2a2"
      }
    },
  },
  plugins: [],
};
