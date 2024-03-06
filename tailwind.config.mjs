/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    extend: {
      colors: {
        colorError: '#E05E58',
        boton:'#3FBAE0',
        botonHover:'#5A3AE0'
      },
    },
  },
  plugins: [],
}

