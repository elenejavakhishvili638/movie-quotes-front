/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial':
        'radial-gradient(ellipse at center, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0) 100%)',
      background: 'linear-gradient(180deg, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0) 100%)'
    },
    colors: {
      cream: '#DDCCAA',
      red: '#E31221',
      'border-color': 'rgba(239, 239, 239, 0.3)'
    },
    width: { 72: '72px', 109: '109px', parallax: '500px' },
    height: { 32: '32px', 38: '38px' },
    backgroundPosition: {
      parallax: 'center'
    },
    backgroundSize: {
      parallax: 'cover'
    },
    backgroundRepeat: {
      parallax: 'no-repeat'
    }
  }
}
export const plugins = []
