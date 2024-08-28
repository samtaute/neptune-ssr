import Image from "next/image";
import { PropsWithChildren } from "react";

export function RoundedImage({
  children,
  image,
  className,
  priority,
  gradient,
  gameGradient
}: PropsWithChildren<{ image: string; className?: string, priority?: boolean, gradient?:boolean, gameGradient?: boolean}>) {

  let style;  
  if(gradient){
    style = {
      backgroundImage: "linear-gradient(0deg, rgba(0, 3, 21, 0.85) 0%, rgba(0, 3, 21, 0) 70%, rgba(0, 3, 21, 0) 70%, rgba(0, 3, 21, 0) 100%)"
    }
  }

  if(gameGradient){
    style={
      backgroundImage: "radial-gradient(353.37% 89.53% at 50% 37.35%, rgba(17, 94, 128, 0.00) 0%, #115E80 74.18%)"
    }
  }

  return (
    <div
      className={`relative flex flex-col rounded-lg justify-end overflow-hidden ${className}`}
    >
      {gradient && <div style={style} className="absolute z-10 h-full w-full"></div>}
      {gameGradient && <div style={style} className="absolute z-10 h-full w-full"></div>}
      <Image
        src={image}
        alt="top image"
        sizes="300px"
        priority={priority}
        fill
        style={{
          objectFit: "cover",
        }}
      />
        {children}
    </div>
  );
}
