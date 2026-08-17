/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Palette dérivée fidèlement de la maquette AzaRatti
        anthracite: {
          DEFAULT: "#161513", // fond principal
          light: "#211f1c",
          card: "#1c1a17",
        },
        gold: {
          DEFAULT: "#c8a465", // laiton/or des titres et accents
          light: "#e0c48c",
          dark: "#9c7d47",
        },
        bordeaux: {
          DEFAULT: "#5a1f28", // rouge profond de la roue "S'Inspirer"
          light: "#7a2c38",
          dark: "#3d1319",
        },
        ivory: "#f2ede3",
      },
      fontFamily: {
        display: ["Marcellus", "serif"], // logo, grands titres
        heading: ["Cormorant Garamond", "serif"], // sous-titres
        body: ["Jost", "sans-serif"], // texte courant
      },
    },
  },
  plugins: [],
};
