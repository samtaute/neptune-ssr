import { PropsWithChildren } from "react";

export function RoundedImage({
    children,
    image,
    className
  }: PropsWithChildren<{ image: string, className?:string }>) {
    const backgroundImage = {
      backgroundImage: `url(${image})`,
    };
  
    return (
      <div
        style={backgroundImage}
        className={`relative flex flex-col rounded-lg bg-cover w-full ${className}`}
      >
        {children}
      </div>
    );
  }