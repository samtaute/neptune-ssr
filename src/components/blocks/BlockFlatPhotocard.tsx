import { BlockProps } from "@/types/propsTypes";
import ViewabilityWrapper from "../common/ViewabilityWrapper";
import { PropsWithChildren } from "react";
import Logo from "../elements/Logo";
import Footer from "../elements/Footer";
import BlockContainer from "../elements/BlockContainer";
import { RoundedImage } from "../elements/RoundedImage";

function BlockFlatPhotocard({ items }: BlockProps) {
  return (
    <BlockContainer>
 {items.map((item) => {
        return (
          <ViewabilityWrapper key={item.uid} itemData={item}>
              <div className="flex pb-3 flex-col items-center gap-3 rounded-lg shadow-lg bg-white w-full">
                <RoundedImage image={item.squareImage} className="h-[340px]">
                  {item.brandLogo && (
                    <Logo
                      src={item.brandLogo}
                      className="absolute left-4 top-4"
                    />
                  )}
                </RoundedImage>
                <div className="flex px-4 flex-col gap-2 self-stretch">
                  <div>
                    <span className="text-lg font-semibold font-sans leading-6">
                      {item.title}
                    </span>
                  </div>
                  <Footer interest={item.primaryInterest}/>
                </div>
              </div>
          </ViewabilityWrapper>
        );
      })}
    </BlockContainer>
  );
}

export default BlockFlatPhotocard;