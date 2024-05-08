/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#dc2625",
        "darkgrey": "#4b5563",
        "bg-primary": "#ef4545",
        "primary-b": "#f57274",
        "bg-primary-h": "#ea767b",
        "bg-secondary": "#ccd3d5",
        "secondary-b": "#777571",
        "bg-secondary-h": "#a5a2a2",
        "bg-gray-active" : "#9ca3af",
        "bg-gray-h" : "#f3f4f6"
      },
      screens: {
        'mob': { 'max': '700px' }
      },
      fontFamily: {
        sans: ['Poppins', "Arial"],
      },

    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
