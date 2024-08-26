import { BlockProps } from "../../types/propsTypes";
import ItemWrapper from "../elements/ItemWrapper";
import BlockContainer from "../elements/BlockContainer";
import { RoundedImage } from "../elements/RoundedImage";
import Title from "../elements/Title";
import BlockContentContainer from "../elements/BlockContentContainer";
import Footer from "../elements/Footer";
import { Description } from "../elements/Description";

function BlockEdge({ items, showDescription }: BlockProps) {
  return (
    <BlockContainer>
      {items.map((item) => { 
        return (
          <ItemWrapper key={item.uid} item={item}>
            <RoundedImage
              image={item.wideImage}
              className="h-[252px]"
            ></RoundedImage>
            <BlockContentContainer>
              <Footer logo={item.brandLogoDark}/>
              <Title title={item.title} />
              {showDescription && item.description && <Description text={item.description}/>}
            </BlockContentContainer>
          </ItemWrapper>
        );
      })}
    </BlockContainer>
  );
}

export default BlockEdge;
