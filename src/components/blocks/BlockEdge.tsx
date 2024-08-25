import { PropsWithChildren } from "react";
import { BlockProps } from "../../types/propsTypes";
import { PhotocardLogo } from "./BlockPhotocard";
import ViewabilityWrapper from "../common/ViewabilityWrapper";
import { BlockPadding, HeroImage } from "../common/layouts";

function BlockEdge({ items }: BlockProps) {
  return (
    <>
      {items.map((item) => {
        return (
          <ViewabilityWrapper key={item.uid} itemData={item}>
            <BlockPadding>
              <a href={item.link} className="block">
                <HeroImage image={item.wideImage}></HeroImage>
                {item.brandLogoDark && (
                  <PhotocardLogo logo={item.brandLogoDark} />
                )}
                <EdgeTitle title={item.title} />
              </a>
            </BlockPadding>
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


