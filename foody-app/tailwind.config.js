const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#ee4d2a',
        accent: '#0F172A',
        'bg-primary': '#FAFAFA',
        'text-gray': '#888786',
        'text-primary': '#10182B',
        grey: '#545454',
        lightgrey: '#F5F7FB',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      addUtilities({
        'px-global': `px-5`,
        'mx-global': `mx-4`,
        'sizing-xxs': 'h-2',
        'sizing-xs': 'h-4',
        'sizing-sm': 'h-8',
        'sizing-md': 'h-12',
        'sizing-lg': 'h-20',
        'sizing-xl': 'h-28',
        'sizing-2xl': 'h-36',
        center: 'flex justify-center items-center',
        sub1: 'text-2.8',
        body1: 'text-3.2',
        body2: 'text-4',
        label: 'text-5 text-text-primary',
        'body-big': 'text-6',
      });
    }),
  ],
};
