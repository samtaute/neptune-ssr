import { PropsWithChildren } from "react";
import { BlockProps } from "../../types/propsTypes";
import { PhotocardLogo } from "./BlockPhotocard";
import ViewabilityWrapper from "../common/ViewabilityWrapper";

function BlockEdge({items}: BlockProps) {

  return (
    <>
      {items.map((item) => {
        return (
          <ViewabilityWrapper key={item.uid} itemData={item}>
            <a href={item.link} className="block mb-4">
              <ImageContainer image={item.wideImage}></ImageContainer>
              {item.brandLogoDark && (
                <PhotocardLogo logo={item.brandLogoDark} />
              )}
              <EdgeTitle title={item.title} />
            </a>
          </ViewabilityWrapper>
        );
      })}
    </>
  );
}

export default BlockEdge;

function EdgeTitle({ title }: { title: string }) {
  return (
    <h2 className="text-black text-xl drop-shadow-sm font-semibold my-2">
      {title}
    </h2>
  );
}

function ImageContainer({
  children,
  image,
}: PropsWithChildren<{ image: string }>) {
  const backgroundImage = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div
      style={backgroundImage}
      className={"relative flex flex-col rounded-lg bg-cover h-[228px] mb-2"}
    >
      {children}
    </div>
  );
}
