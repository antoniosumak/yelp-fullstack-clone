module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
