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
        "pric": "#dc2626",
        "pri-lightc": "#ef4444",
        "sec-c": "transparent",
        "sec-lightc": "#f8faff",
        "pri-hovc": "#b91c1c",
        "sec-hovc": "#e5e7eb",
        "th-bgc": "#fff",
        "error-bgc": "#dc2626",
        "success-bgc": "#22c55e",
        "disabled-bgc": "#a3a3a3",
        "approve-bgc": "#22c55e",
        "reject-bgc": "#ef4444",
        "pri-txtc": "#2e2a2b",
        "sec-txtc": "#585555",
        "pri-but-txtc": "#fff",
        "sec-but-txtc": "#1f2937",
        "th-txtc": "#1f2937",
        "error-txt-c": "#dc2626",
        "success-txt-c": "#22c55e",
        "pri-butb": "#dc2626",
        "pri-butb-h": "#dc2626",
        "sec-butb": "#585555",
        "sec-butb-h": "#585555",
        "pri-b": "#d3d7dd"
      },
      screens: {
        mob: { min: '320px', max: '480px' },  // Mobile devices
        tablet: { min: '481px', max: '768px' },  // iPads, Tablets
        lap: { min: '769px', max: '1024px' },    // Small screens, laptops
        desk: { min: '1025px', max: '3000px' },
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
