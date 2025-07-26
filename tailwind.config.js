module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rick: {
          DEFAULT: '#22d3ee', // cyan-400
          dark: '#0e7490',    // cyan-700
        },
        morty: {
          DEFAULT: '#fbbf24', // yellow-400
          dark: '#f59e42',    // orange-400
        },
        portal: {
          DEFAULT: '#a3e635', // lime-400
          dark: '#65a30d',    // lime-700
        },
        evil: {
          DEFAULT: '#a21caf', // purple-800
          dark: '#f472b6',    // pink-400
        },
        bg: {
          light: '#f0f9ff',   // sky-50
          dark: '#0f172a',    // slate-900
        },
        card: {
          light: '#e0f2fe',   // cyan-100
          dark: '#1e293b',    // slate-800
        },
        accent: {
          light: '#38bdf8',   // sky-400
          dark: '#818cf8',    // indigo-400
        },
      },
    }
  },
  plugins: []
};