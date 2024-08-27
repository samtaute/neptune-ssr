import { PropsWithChildren } from "react";
import { BlockProps } from "../../types/propsTypes";
import ItemWrapper from "../block-elements/ItemWrapper";
import Container from "../block-elements/Container";

function BlockList({ items }: BlockProps) {
  return (
  <Container>
  {items.map((item) => {
        return (
          <ItemWrapper key={item.uid} item={item}>
                <ImageContainer
                  imageUrl={item.wideImage}
                  height={114}
                  width={112}
                />
                <div className="absolute text-sm w-[220px] left-[144px]">{item.title}</div>
                <div className="absolute left-[144px] bottom-[28px] font-sans">
                  {item.brandLogoDark && <LogoContainer logoUrl={item.brandLogoDark} />}
                </div>
            </ItemWrapper>
        );
      })}
    </Container>
  );
}

export default BlockList;



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
