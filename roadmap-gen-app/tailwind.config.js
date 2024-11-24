/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add customizations here if necessary
    },
  },
  plugins: [
    require("tailwind-scrollbar"), // Include the plugin
  ],
};
