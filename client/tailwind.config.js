/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#8B0000', // Kushal's Maroon
                secondary: '#D4AF37', // Kushal's Gold
                'primary-dark': '#600000',
                'secondary-light': '#F4E5B0',
                gold: {
                    100: '#F9F1D8',
                    200: '#F0DEAA',
                    300: '#E6CB7D',
                    400: '#DDB852',
                    500: '#D4AF37',
                    600: '#AA8C2C',
                    700: '#806316',
                    800: '#55420F',
                    900: '#2B2107',
                },
                dark: {
                    900: '#1a1a1a',
                }
            },
            fontFamily: {
                serif: ['Cinzel', 'Playfair Display', 'serif'],
                sans: ['Lato', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
