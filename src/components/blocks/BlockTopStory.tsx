import { BlockProps } from "../../types/propsTypes";
import BlockHeader from "./BlockHeader";
import ItemWrapper from "../block-elements/ItemWrapper";
import Divider from "../block-elements/Divider";
import { RoundedImage } from "../block-elements/RoundedImage";
import ItemContentContainer from "../block-elements/ItemContentContainer";
import ItemFooter from "../block-elements/ItemFooter";
import ItemTitle from "../block-elements/ItemTitle";
import ItemDescription from "../block-elements/ItemDescription";
import { PropsWithChildren } from "react";

function BlockTopStory({ items, priority }: BlockProps) {
  return (
    <>
      {items.map((item) => {
        return (
          <ItemWrapper key={item.uid} item={item}>
            <div className="gap-3 flex flex-col items-start pb-3">
              <BlockHeader
                text={getFormattedDate()}
                sub="Your Daily Briefing"
              />
              <BlockEdgeNoPadding items={[item]} priority showDescription />
              <Divider />
            </div>
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

function BlockEdgeNoPadding({ items, showDescription, priority }: BlockProps) {
  return (
    <div className="px-5 flex w-full min-w-[250px] flex-col">
      {items.map((item) => {
        //todo: implement Itemwrapper w/out hydration error
        return (
          <div key={item.uid}>
            <RoundedImage
              image={item.wideImage}
              className="h-[252px]"
              priority={priority}
            ></RoundedImage>
            <ItemContentContainerNoPadding>
              <ItemFooter logo={item.brandLogoDark} />
              <ItemTitle title={item.title} />
              {showDescription && item.description && (
                <ItemDescription text={item.description} />
              )}
            </ItemContentContainerNoPadding>
          </div>
        );
      })}
    </div>
  );
}

function ItemContentContainerNoPadding({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`flex flex-col gap-2 self-stretch items-start pt-2 ${className}`}
    >
      {children}
    </div>
  );
}
