import { PropsWithChildren } from "react";

export function BlockPadding({ children }: PropsWithChildren) {
    return <div className="p-5 pt-0 flex w-full">{children}</div>;
  }


export function HeroImage({
    children,
    image,
  }: PropsWithChildren<{ image: string }>) {
    const backgroundImage = {
      backgroundImage: `url(${image})`,
    };
  
    return (
      <div
        style={backgroundImage}
        className={"relative flex flex-col rounded-lg bg-cover h-[228px] w-full"}
      >
        {children}
      </div>
    );
  }