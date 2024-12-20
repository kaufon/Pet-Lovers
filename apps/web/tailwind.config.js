/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/theme";

export default {
  content: [
    './src/ui/**/*.{js,ts,jsx,tsx}',
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  darkMode: "class",
 plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: '#60a5fa',
            foreground: '#FAFAFA'
          },
          danger: {
            DEFAULT: "#E11D48"
          },
          secondary: {
            DEFAULT: '#18181b',
          },
          success: {
            DEFAULT: '#17C964'
          }
        },
      },
    },
  })],
}
