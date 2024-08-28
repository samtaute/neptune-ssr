import { BlockProps } from "../../types/propsTypes";
import ItemWrapper from "../block-elements/ItemWrapper";
import Container from "../block-elements/Container";
import { RoundedImage } from "../block-elements/RoundedImage";
import ItemTitle from "../block-elements/ItemTitle";
import ItemContentContainer from "../block-elements/ItemContentContainer";
import ItemFooter from "../block-elements/ItemFooter";
import ItemDescription from "../block-elements/ItemDescription";

function BlockEdge({ items, showDescription }: BlockProps) {
  return (
    <Container>
      {items.map((item) => { 
        return (
          <ItemWrapper key={item.uid} item={item}>
            <RoundedImage
              image={item.wideImage}
              className="h-[252px]"
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
