/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./garage/templates/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        onyx: "#454545",
        celestialBlue: "#007CBB",
        whiteTeal: "#FBFFFE",
        darkBlue: "#1F01B9",
        whiteTealForGradient: "#FBFFFECC",
      },
      fontFamily: {
        nobile: ["Nobile", "sans-serif"],
        rasa: ["Rasa", "serif"],
        rokkitt: ["Rokkitt", "serif"],
      },
      spacing: {
        128: "32rem",
      },
      height: {
        0.75: "0.1875rem",
      },
      margin: {
        0.75: "0.1875rem",
      },
      backgroundImage: {
        vehiclesSectionGradient:
          "linear-gradient(0deg, #FBFFFE 0 10%, #454545 10% 90%, #FBFFFE 90% 100%)",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
}

