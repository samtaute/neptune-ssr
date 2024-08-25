import { BlockProps } from "@/types/propsTypes";
import { BlockPadding, HeroImage } from "../common/layouts";
import ViewabilityWrapper from "../common/ViewabilityWrapper";
import { PropsWithChildren } from "react";

function BlockFlatPhotocard({ items }: BlockProps) {
  return (
    <>
      {items.map((item) => {
        return (
          <ViewabilityWrapper key={item.uid} itemData={item}>
            <BlockPadding>
              <div className="flex pb-3 flex-col items-center gap-3 rounded-lg shadow-lg bg-white w-full">
                <HeroImageFlat image={item.wideImage} />
                <div className="flex px-4 flex-col gap-2 self-stretch">
                  <div>
                    <span className="text-lg font-semibold leading-6">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="text-xs font-medium text-[#747474] leading-4">Travel</span>
                  </div>
                </div>
              </div>
            </BlockPadding>
          </ViewabilityWrapper>
        );
      })}
    </>
  );
}

export default BlockFlatPhotocard;

export function HeroImageFlat({
  children,
  image,
}: PropsWithChildren<{ image: string }>) {
  const backgroundImage = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div
      style={backgroundImage}
      className={"relative flex flex-col rounded-lg bg-cover h-[340px] w-full"}
    >
      {children}
    </div>
  );
}
