import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-ibm)']
      },
      colors: {
        'custom-gray':'#747474'
      },
      keyframes: {
        cookieBounce: {
          '0%, 100%': {
            bottom: '77px',
            'transition-timing-function': 'cubic-bezier(0.64, 0.04, 0.35, 1)',
          },
          '20%': {
            bottom: '45px',
            'transition-timing-function': 'cubic-bezier(0.64, 0.04, 0.35, 1)',
          },
          '30%': {
            bottom: '37px',
            'transition-timing-function': 'cubic-bezier(0.64, 0.04, 0.35, 1)',
          },
          '13%, 27%, 37%, 62%': {
            bottom: '36px',
            'transition-timing-function': 'cubic-bezier(0.64, 0.04, 0.35, 1)',
          },
        },
        shadowBounce: {
          '0%, 100%': {
            width: '109px',
            height: '9px',
            'transition-timing-function': 'cubic-bezier(0.64, 0.04, 0.35, 1)',
          },
          '20%': {
            width: '109px',
            height: '9px',
            'transition-timing-function': 'cubic-bezier(0.64, 0.04, 0.35, 1)',
          },
          '13%, 27%, 37%, 62%': {
            width: '146px',
            height: '12px',
            'transition-timing-function': 'cubic-bezier(0.64, 0.04, 0.35, 1)',
          },
        },
        cookieSlideUp:{
          '0%':{
            bottom: '36px',
            'transition-timing-function': 'cubic-bezier(0.64, 0.04, 0.35, 1)',
            'transform-origin': 'bottom', 
          },
          '100%': {
            bottom: '77px',
            'transition-timing-function': 'cubic-bezier(0.64, 0.04, 0.35, 1)'
          }
        }
      },
      animation: {
        cookieBounce: 'cookieBounce 1600ms infinite',
        shadowBounce: 'shadowBounce 1600ms infinite',
        cookieSlideUp: 'cookieSlideUp 100ms'
      },
    },
  },
  plugins: [
    
  ],
};
export default config;
