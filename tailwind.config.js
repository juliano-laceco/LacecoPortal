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
        "pric": "#e84a40",
        "pri-lightc": "#ffa099",
        "sec-c": "transparent",
        "sec-lightc": "#f8faff",
        "pri-hovc": "#b91c1c",
        "sec-hovc": "#f7f8f9",
        "nav-c": "#d1d5db",
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
        "basic-item-hov": "#f3f4f6",
        "error-txt-c": "#dc2626",
        "success-txt-c": "#22c55e",
        "pri-butb": "#e84a40",
        "pri-butb-h": "#dc2626",
        "sec-butb": "#9ca3af",
        "sec-butb-h": "#9ca3af",
        "pri-b": "#9ca3af",
        "input-b": "#9ca3af",
        "input-focb": "#ef4444",
        "input-bg": "#f7f8f9",
        "input-dis": "#d1d5db",
        "gray-active": "#9ca3af",
        "section-bg": "#f4f4f5",
        "form-title": "text-xl",
        "active": "#6ABE6B",
        "terminated": "#e84a40",
        "probation": "#feb247"

      },
      screens: {
        mob: { min: '320px', max: '730px' },  // Mobile devices
        tablet: { min: '731px', max: '1300px' },  // iPads, Tablets
        lap: { min: '1301px', max: '1600px' },    // Small screens, laptops
        desk: { min: '1601px', max: '3000px' },
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
