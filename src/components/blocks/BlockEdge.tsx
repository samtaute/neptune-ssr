import { BlockProps } from "../../types/propsTypes";
import ItemWrapper from "../elements/ItemWrapper";
import BlockContainer from "../elements/BlockContainer";
import { RoundedImage } from "../elements/RoundedImage";
import Title from "../elements/Title";
import BlockContentContainer from "../elements/BlockContentContainer";
import Footer from "../elements/Footer";

//start here: substitute rounded image for hero. use image component and optimize for lcp
function BlockEdge({ items }: BlockProps) {
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
            </BlockContentContainer>
          </ItemWrapper>
        );
      })}
    </BlockContainer>
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
