/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
export const theme = {
  margin: {
    5.5: '5.5rem',
    2.25: '2.25rem',
    1.5: '1.5rem',
    2.5: '2.5rem',
    4.5: '4.5rem',
    2: '2rem',
    1: '1rem',
    8: '8rem',
    3.75: '3.75rem',
    6.25: '6.25rem',
    14.25: '14.25rem',
    0.75: '0.75rem',
    0.875: '0.875rem',
    0.5: '0.5rem',
    2.375: '2.375rem',
    3.813: '3.813rem',
    7.938: '7.938rem',
    12.313: '12.313rem',
    3.5: '3.5rem'
  },
  extend: {
    backgroundImage: {
      'gradient-radial':
        'radial-gradient(ellipse at center, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0) 100%)',
      background: 'linear-gradient(180deg, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0) 100%)'
    },
    boxShadow: {
      'custom-focus': '0 0 0 4px rgba(13, 110, 253, 0.25)'
    },
    colors: {
      cream: '#DDCCAA',
      red: '#E31221',
      'border-color': 'rgba(239, 239, 239, 0.3)',
      modal: '#11101A'
    },
    width: {
      72: '72px',
      109: '109px',
      parallax: '500px',
      37: '37rem',
      60: '60rem',
      31: '31rem',
      8: '8rem',
      18: '18rem',
      24: '24rem',
      26: '26rem',
      11: '11rem',
      27: '27rem',
      6: '6rem',
      12: '12rem',
      5.6: '5.6rem',
      8.75: '8.75rem',
      22: '22.375rem',
      14.5: '14.5rem',
      13.625: '13.625rem',
      48.5: '48.5rem',
      59: '59rem',
      28.25: '28.25rem',
      55.5: '55.5rem',
      19: '19rem',
      22.75: '22.75rem',
      33: '33rem',
      62.375: '62.375rem',
      37.5: '37.5rem',
      11.75: '11.75rem',
      31.25: '31.25rem',
      5.625: '5.625rem',
      3.75: '3.75rem',
      22.375: '22.375rem',
      56: '56rem',
      19.125: '19.125rem'
    },
    minWidth: {
      21: '21.25rem',
      7: '7rem'
    },
    minHeight: {
      135: '135vh'
    },
    height: {
      32: '32px',
      38: '38px',
      11: '11rem',
      7: '7rem',
      5: '5rem',
      41: '41rem',
      47: '47rem',
      5.25: '5.25rem',
      11.5: '11.5rem',
      9: '9rem',
      2.6: '2.6rem',
      19: '19rem',
      6: '6rem',
      3.25: '3.25rem',
      48.5: '48.5rem',
      12.5: '12.5rem',
      31: '31rem',
      3: '3rem',
      13.188: '13.188rem',
      11.75: '11.75rem',
      3.75: '3.75rem',
      5.375: '5.375rem',
      18.875: '18.875rem',
      32.063: '32.063rem'
    },
    backgroundPosition: {
      parallax: 'center'
    },
    backgroundSize: {
      parallax: 'cover'
    },
    backgroundRepeat: {
      parallax: 'no-repeat'
    },
    gridTemplateColumns: {
      fill: 'repeat(auto-fill, minmax(300px, 1fr))'
    }
  }
}
export const plugins = []
