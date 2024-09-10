import { useState, useEffect, useCallback } from "react";
import ItemTitle from "@/components/block-elements/ItemTitle";
import { fetchRawDaily } from "@/lib/softbox-api/actions";

function BlockFortune({language}:{language: string}) {
  const [isReveal, setIsReveal] = useState(false);
  const {fortune, refreshFortune} = useFortunes(language)

  let animation = "animate-cookieBounce";
  let shadowAnimation = "animate-shadowBounce";
  let reveal = "invisible";
  if (isReveal) {
    animation = "animate-cookieSlideUp opacity-10";
    shadowAnimation = "";
    reveal = "visible";
  }
  const clickHandler = () => {
    setIsReveal(!isReveal)
    refreshFortune()
  };

  return (
    <div onClick={clickHandler} className="p-5 pt-0">
      <div className="bg-[#C9efff] rounded-lg h-[284px] w-full relative flex flex-col justify-start items-center overflow-hidden">
        {isReveal && <ReloadIcon />}
        <div className="p-4 w-full flex justify-start">
          <ItemTitle title="Fortune Cookie" />
        </div>
        <div
          className={`w-[182px] h-[147px] absolute bottom-[77px] ${animation}`}
        >
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
        <div
          className={`opacity-10 w-[146px] h-[12px] rounded-[50%] absolute bottom-4 ${shadowAnimation} bg-black`}
        ></div>
        <div
          className={`font-sans px-5 font-medium z-10 w-full text-center absolute bottom-[50%] ${reveal}`}
        >
          {fortune}
        </div>
      </div>
    </div>
  );
}

export default BlockFortune;

function ReloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[-110px] right-[-260px]">
      <path d="M3.25195 12C3.25195 12.3424 2.96837 12.626 2.62594 12.626C2.27816 12.626 1.99994 12.3424 1.99994 12C1.99994 9.23917 3.11818 6.7405 4.92664 4.9267C6.74044 3.11825 9.23911 2 11.9999 2C13.6532 2 15.2156 2.40128 16.5906 3.11825C17.5216 3.59979 18.3723 4.22579 19.1054 4.96415V3.57303C19.1054 3.2306 19.3836 2.94703 19.7314 2.94703C20.0738 2.94703 20.352 3.2306 20.352 3.57303V6.69235V6.6977C20.352 7.04548 20.0738 7.3237 19.7314 7.3237H16.6067C16.2589 7.3237 15.9807 7.04548 15.9807 6.6977C15.9807 6.35527 16.2589 6.0717 16.6067 6.0717H18.4365C17.7463 5.32263 16.9331 4.69663 16.0181 4.22579C14.8196 3.59979 13.4499 3.25201 11.9999 3.25201C9.58154 3.25201 7.3932 4.23114 5.81482 5.81487C4.23108 7.39326 3.25195 9.58159 3.25195 12ZM4.89454 20.427C4.89454 20.7694 4.61631 21.0476 4.26853 21.0476C3.9261 21.0476 3.64253 20.7694 3.64253 20.427V17.313V17.3023V17.2862V17.2702L3.64788 17.2541V17.2381V17.222L3.65323 17.206V17.1899L3.65858 17.1739V17.1578L3.66393 17.1418L3.66928 17.1311V17.115L3.67463 17.099L3.67998 17.0829L3.68533 17.0722L3.69068 17.0562L3.70138 17.0455V17.0401L3.70673 17.0294L3.71208 17.0134L3.71743 17.0027L3.72814 16.9866L3.73349 16.9759L3.74419 16.9652L3.74954 16.9492L3.76024 16.9385L3.76559 16.9278L3.77629 16.9117L3.78699 16.901L3.79769 16.8903L3.80839 16.8796L3.81374 16.8689L3.82444 16.8582L3.83514 16.8475L3.84585 16.8368H3.8512L3.8619 16.8261L3.8726 16.8154L3.8833 16.8101L3.894 16.7994L3.9047 16.7887L3.92075 16.7833L3.93145 16.7726L3.94215 16.7673L3.95821 16.7566L3.96891 16.7512L3.98496 16.7459L3.99566 16.7352L4.01171 16.7298L4.02776 16.7245L4.03846 16.7191L4.05451 16.7138L4.07057 16.7084L4.08127 16.703L4.09732 16.6977L4.11337 16.6923H4.12942L4.14012 16.687H4.14547H4.15617L4.17222 16.6816H4.18828L4.20433 16.6763H4.22038H4.23643H4.25248H4.26853H4.27923H7.3932C7.74098 16.6763 8.0192 16.9545 8.0192 17.3023C8.0192 17.6447 7.74098 17.923 7.3932 17.923H5.56334C6.2482 18.6667 7.06147 19.2927 7.9657 19.7635C9.16955 20.3949 10.5446 20.748 11.9999 20.748C14.413 20.748 16.6013 19.7689 18.1851 18.1851C19.7688 16.6014 20.7479 14.4131 20.7479 12C20.7479 11.6522 21.0262 11.374 21.3739 11.374C21.7164 11.374 22 11.6522 22 12C22 14.7608 20.8764 17.2595 19.0679 19.068C17.2594 20.8764 14.7608 22 11.9999 22C10.336 22 8.76827 21.5934 7.38785 20.8711C6.46222 20.3895 5.6222 19.7689 4.89454 19.0305V20.427Z" />
    </svg>
  );
}

function useFortunes(language: string){
  
  const [fortunes, setFortunes] = useState<string[]>([])
  const [randomNumber, setRandomNumber] = useState<number>(0)

  const refreshFortune = useCallback(()=>{
    setRandomNumber(Math.random())
  }, [])

  useEffect(()=>{
    getFortunes(language)
      .then((data)=>{
        setFortunes(data); 
      }).then(()=>refreshFortune())

  }, [language, refreshFortune])

  const numFortunes = fortunes.length
  const currFortune = fortunes[Math.floor(numFortunes*randomNumber)]

  return {
    fortune: currFortune, 
    refreshFortune
  }

}

async function getFortunes(language: string){
  const rawData = await fetchRawDaily('fortune-cookie', language); 
  if (rawData.items.length === 0){
    console.error(`Fortune-cookie schedule in language ${language} returned no items`)
  }
 let fortunes = []; 
 for (const item of rawData.items){
  fortunes.push(item.fortune.fortunetext[language])
 }
 return fortunes; 
}
