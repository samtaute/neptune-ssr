import { BlockProps } from "../../types/propsTypes";
import ItemWrapper from "../common/ItemWrapper";
import Container from "../common/Container";
import { RoundedImage } from "../common/RoundedImage";
import ItemTitle from "../common/ItemTitle";
import ItemContentContainer from "../common/ItemContentContainer";
import ItemFooter from "../common/ItemFooter";
import ItemDescription from "../common/ItemDescription";

function BlockEdge({ items, showDescription, unoptimized }: BlockProps) {
  return (
    <Container>
      {items.map((item) => { 
        return (
          <ItemWrapper key={item.uid} item={item}>
            <RoundedImage
              image={item.wideImage}
              className="h-[252px]"
              unoptimized
            ></RoundedImage>
            <ItemContentContainer>
              <ItemFooter logo={item.brandLogoDark}/>
              <ItemTitle title={item.title} />
              {showDescription && item.description && <ItemDescription text={item.description}/>}
            </ItemContentContainer>
          </ItemWrapper>
        );
      })}
    </Container>
  );
}

export default BlockEdge;
