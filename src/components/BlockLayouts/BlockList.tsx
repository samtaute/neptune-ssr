import { PropsWithChildren } from "react";
import { BlockProps } from "../../types/propsTypes";
import ViewabilityWrapper from "../common/ViewabilityWrapper";

function BlockList({ items }: BlockProps) {
  return (
    <>
      {items.map((item) => {
        return (
          <ViewabilityWrapper key={item.uid} itemData={item}>
            <a href={item.link} className="block">
              <BlockPadding>
                <ImageContainer
                  imageUrl={item.wideImage}
                  height={114}
                  width={112}
                />
                <div className="absolute text-sm w-[220px] left-[124px]">{item.title}</div>
                <div className="absolute left-[124px] bottom-[28px] font-sans">
                  {item.brandLogoDark && <LogoContainer logoUrl={item.brandLogoDark} />}
                </div>
              </BlockPadding>
            </a>
          </ViewabilityWrapper>
        );
      })}
    </>
  );
}

export default BlockList;

function BlockPadding({ children }: PropsWithChildren) {
  return <div className="pb-4 flex relative">{children}</div>;
}

function LogoContainer({ logoUrl }: { logoUrl: string }) {
  return (
    <div className="flex items-start">
      <img src={logoUrl} alt="publisher logo" className="h-4" />
    </div>
  );
}

type ImageProps = {
  imageUrl: string;
  height: number;
  width: number;
  className?: string;
};
function ImageContainer({
  imageUrl,
  height,
  width,
  className,
  children,
}: PropsWithChildren<ImageProps>) {
  const backgroundImage = {
    backgroundImage: `url(${imageUrl})`,
    height: `${height}px`,
    width: `${width}px`,
  };
  return (
    <div
      style={backgroundImage}
      className={`rounded-lg bg-cover bg-center ${className}`}
    >
      {children}
    </div>
  );
}
