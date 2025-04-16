/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Gunakan Poppins sebagai font default
      },
      colors: {
        'amber-rich': '#E7BC4C', // Warna custom amber yang elegan
        'amber-light': '#F6E1A7', // Warna amber yang lebih terang
        'amber-dark': '#C69A2D', // Warna amber yang lebih gelap
        'amber-star': '#F2C94C', // Warna amber yang lebih cerah
        'amber-sunset': '#D89B2A', // Warna amber yang lebih hangat
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.25rem', // Ukuran font untuk h1
              fontWeight: '700', // Tebal font
              color: '#ffffff', // Warna teks
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '600',
              color: '#ffffff',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '500',
              color: '#ffffff',
            },
            p: {
              fontSize: '1rem',
              lineHeight: '1.75',
              color: '#d1d5db', // Warna teks abu-abu
            },
            a: {
              color: '#38bdf8', // Warna link
              textDecoration: 'none',
              '&:hover': {
                color: '#0ea5e9', // Warna link saat hover
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Tambahkan plugin typography
  ],
};
