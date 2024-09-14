import { BlockProps } from "../../types/propsTypes";
import ItemWrapper from "../common/ItemWrapper";
import Container from "../common/Container";
import Logo from "../common/Logo";
import { ItemTitleSmall } from "../common/ItemTitle";
import { RoundedImage } from "../common/RoundedImage";
import ItemFooter from "../common/ItemFooter";

function BlockList({ items }: BlockProps) {
  return (
    <Container>
      {items.map((item) => {
        return (
          <ItemWrapper key={item.uid} item={item}>
            <div className="flex pt-4 gap-3">
              <div className="flex flex-col pt-1 gap-2 flex-1 h-[84px]line-clamp-3">
                <div className="flex items-start">
                  {item.brandLogoDark && (
                    <Logo src={item.brandLogoDark} />
                  )}
                </div>
                <ItemTitleSmall title={item.title} className="text-sm font-medium"/>
              </div>
              <RoundedImage
                image={item.squareImage}
                className="h-[84px] w-[84px]"
              />
            </div>
            <ItemFooter interest={item.primaryInterest} className="h-[44px]"/>   
          </ItemWrapper>
        );
      })}
    </Container>
  );
}

export default BlockList;
