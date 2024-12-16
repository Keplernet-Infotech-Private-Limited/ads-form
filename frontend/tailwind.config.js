/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container by default
        padding: '2rem', // Adds padding inside the container
        screens: {
          sm: '100%', // 100% width on small screens
          md: '750px', // 750px on medium screens
          lg: '970px', // 970px on large screens
          xl: '1170px', // 1170px on extra-large screens
        },
      },
    },
  },
  plugins: [],
}

