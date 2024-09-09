import { useState } from "react";
import { BlockProps } from "@/types/propsTypes";
import ItemTitle from "@/components/block-elements/ItemTitle";

function BlockFortune({ items }: BlockProps) {
  const [isReveal, setIsReveal] = useState(false)
  return (
    <div className="p-5 pt-0">
      <div className="bg-[#C9efff] rounded-lg h-[284px] w-full relative flex flex-col justify-start items-center">
        <div className="p-4 w-full flex justify-start"><ItemTitle title="Fortune Cookie"/></div>
        <div className="w-[182px] h-[147px] absolute animate-cookieBounce">
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient
                id="a"
                x1="50%"
                x2="50%"
                y1="6.834%"
                y2="109.627%"
              >
                <stop offset="0%" stopColor="#FCBD4C" />
                <stop offset="100%" stopColor="#F4A640" />
              </linearGradient>
              <linearGradient
                id="b"
                x1="50%"
                x2="50%"
                y1="-1.743%"
                y2="162.631%"
              >
                <stop offset="0%" stopColor="#FCBD4C" />
                <stop offset="100%" stopColor="#F4A640" />
              </linearGradient>
              <linearGradient
                id="c"
                x1="50.001%"
                x2="50.001%"
                y1="-12.749%"
                y2="189.948%"
              >
                <stop offset="0%" stopColor="#FCBD4C" />
                <stop offset="100%" stopColor="#F4A640" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="nonzero">
              <path
                fill="url(#a)"
                d="M93.456 57.091s10.102-20.123 23.472-34.968C129.348 8.33 144.897-.293 149.93.143c10.444.891 52.21 85.574 20.047 119.893C132.28 160.256.976 159.246.14 90.764-.443 42.654 16.83 6.825 24.281 5.731c3.611-.533 24.155 3.184 40.057 15.737 16.91 13.355 29.118 35.623 29.118 35.623z"
              />
              <path
                fill="#D39F4C"
                d="M25.865 91.253c-1.09-27.48 12.363-62.654 11.302-71.599-.935-7.87-10.086-16.302-15.284-10.587C9.65 22.532 7.904 73.708 14.137 105.564c2.029 10.37 8.288 19.933 13.056 27.765a79.882 79.882 0 0 0 5.685 2.938c-3.315-10.57-6.294-26.85-7.013-45.014z"
                opacity=".8"
                style={{ mixBlendMode: "multiply" }}
              />
              <path
                fill="#96591D"
                d="M23.492 89.28c-1.008-25.435 8.306-66.1 8.621-68.979.525-4.783-4.633-11.972-9.371-6.615-4.738 5.357-11.986 59.826-5.039 89.057 2.601 10.939 8.707 24.246 12.724 32.33.367.187.736.372 1.108.555-3.482-9.491-7.298-27.548-8.043-46.347zM107.95 113.868c2.156.027 3.083-8.298 1.922-12.512-1.818-6.599-6.06-12.33-5.024-26.768 1.065-14.855 1.754-32.764 5.587-44.573-10.017 13.208-16.98 27.076-16.98 27.076 6.431 13.362 8.614 56.705 14.494 56.777z"
                opacity=".8"
                style={{ mixBlendMode: "multiply" }}
              />
              <path
                fill="#D39F4C"
                d="M81.734 146.866c34.73 1.188 71.13-8.573 88.24-26.831 20.506-21.875 10.968-64.209-1.347-92.265 6.77 75.161-27.2 109.892-86.893 119.096z"
                opacity=".8"
                style={{ mixBlendMode: "multiply" }}
              />
              <path
                fill="url(#b)"
                d="M147.15 11.785c2.165 1.095-21.366 91.803-24.669 91.803-1.528 0-8.157-43.314-2.719-59.437 7.36-21.812 26.224-32.955 27.388-32.366z"
                opacity=".5"
                style={{ mixBlendMode: "screen" }}
              />
              <path
                fill="url(#c)"
                d="M91.03 94.072c1.18-1.086-4.342-28.962-16.663-46.948C61.388 28.189 41.52 19.136 40.514 19.679c-1.96 1.058 48.09 76.622 50.515 74.393z"
                opacity=".5"
                style={{ mixBlendMode: "screen" }}
              />
              <path
                fill="#96591D"
                d="M32.113 20.299c.525-4.784-4.633-11.972-9.371-6.615-3.406 3.85-8.107 33.07-7.897 60.056l10.117-10.937c2.432-20.547 6.933-40.515 7.151-42.504z"
                opacity=".9"
                style={{ mixBlendMode: "multiply" }}
              />
              <path
                fill="#D39F4C"
                d="M14.137 105.564a160.58 160.58 0 0 1-1.425-8.578c-5.08-1.475-9.673-5.222-12.585-9.902-.007 1.218-.004 2.445.01 3.68.245 19.404 10.959 33.398 27.055 42.565-4.769-7.833-11.026-17.394-13.055-27.765z"
                opacity=".8"
                style={{ mixBlendMode: "multiply" }}
              />
            </g>
          </svg>
        </div>
        <div className="opacity-10 w-[146px] h-[12px] rounded-[50%] absolute bottom-4 animate-shadowBounce bg-black"></div>
      </div>
    </div>
  );
}

export default BlockFortune;
