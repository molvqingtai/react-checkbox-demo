module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        theme: '#5DC7CA',
        minor: '#80dde0',
        secondary: '#D6F1F3',
        ground: '#F9FAFD'
      },
      minWidth: {
        1200: '1200px'
      }
    }
  },
  variants: {
    extend: {
      textColor: ['active']
    }
  },
  plugins: []
};
