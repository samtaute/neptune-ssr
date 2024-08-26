import { BlockProps } from "../../types/propsTypes";
import BlockHeader from "./BlockHeader";
import { PhotocardLogo } from "./BlockPhotocard";
import { RoundedImage } from "../block-elements/RoundedImage";
import ItemWrapper from "../block-elements/ItemWrapper";

function BlockTopStory({ items }: BlockProps) {
  return (
    <>
      {items.map((item) => {
        return (
          <ItemWrapper key={item.uid} item={item}>
            <a href={item.link}>
              <div className="gap-3 flex flex-col items-start pb-3">
                <BlockHeader
                  text={getFormattedDate()}
                  sub="Your Daily Briefing"
                />
                <div className="px-5 w-full">
                  <RoundedImage image={item.wideImage} />
                </div>
                <div className="flex flex-col items-start gap-2 pt-2 px-5 pb-1">
                  {item.brandLogoDark && (
                    <PhotocardLogo logo={item.brandLogoDark} />
                  )}
                  <div className="font-bold text-lg w-full">{item.title}</div>
                  {item.description && (
                    <div className="text-slate-800 text-sm text-ellipsis overflow-hidden  box-content">
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            </a>
          </ItemWrapper>
        );
      })}
    </>
  );
}

export default BlockTopStory;

function getFormattedDate() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
