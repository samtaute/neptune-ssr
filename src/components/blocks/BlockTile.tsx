import { BlockProps } from "@/types/propsTypes";
import Container from "../common/Container";
import ItemWrapper from "../common/ItemWrapper";
import { RoundedImage } from "../common/RoundedImage";
import Logo from "../common/Logo";
import ItemTitle, { ItemTitleSmall } from "../common/ItemTitle";
import ItemFooter from "../common/ItemFooter";

function BlockTile({ items, unoptimized }: BlockProps) {
  let displayItems = items;
  //ensure an even number of items to display.
  if (items.length % 2 !== 0) {
    displayItems = items.slice(0, -1);
  }
  return (
    <div className="p-5 pt-0 flex w-full gap-4 min-w-[250px] flex-wrap justify-center">
      {displayItems.map((item) => {
        return (
          <div className="flex flex-wrap w-[calc(50%-8px)] gap-2 shadow-lg pb-2" key={item.uid}>
            <ItemWrapper item={item}>
              <RoundedImage
                image={item.squareImage}
                className="h-[102px] w-full"
                unoptimized = {unoptimized}
              />
              <div className="px-3 flex flex-col items-start gap-2 mt-2">
              {item.brandLogoDark && <Logo className="h-4" src={item.brandLogoDark} />}
              <ItemTitleSmall title={item.title} className="h-[74px]" />
              <ItemFooter />
              </div>
            </ItemWrapper>
          </div>
        );
      })}
    </div>
  );
}

export default BlockTile;
