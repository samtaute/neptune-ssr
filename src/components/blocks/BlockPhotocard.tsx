import { BlockProps } from "../../types/propsTypes";
import Container from "../block-elements/Container";
import ItemWrapper from "../block-elements/ItemWrapper";
import { RoundedImage } from "../block-elements/RoundedImage";
import ItemContentContainer from "../block-elements/ItemContentContainer";
import Logo from "../block-elements/Logo";
import ItemTitle from "../block-elements/ItemTitle";
import ItemFooter from "../block-elements/ItemFooter";

function BlockPhotocard({ items, priority, unoptimized
 }: BlockProps) {
  return (
    <Container>
      {items.map((item) => {
        return (
          <ItemWrapper key={item.uid} item={item}>
            <div className="pb-5">
            <RoundedImage
              image={item.wideImage}
              gradient={true}
              className="h-[254px]"
              priority={priority}
              unoptimized={unoptimized}
            >
              <div className="z-20">
                <ItemContentContainer className="px-5">
                  {item.brandLogo && <Logo src={item.brandLogo} />}
                  {item.title && <ItemTitle title={item.title} isLight />}
                  <ItemFooter isLight/>
                </ItemContentContainer>
              </div>
            </RoundedImage>
            </div>
          </ItemWrapper>
        );
      })}
    </Container>
  );
}

// {item.brandLogo && <PhotocardLogo logo={item.brandLogo} />}
// <PhotocardTitle title={item.title}></PhotocardTitle>
// <PhotocardFooter />

export default BlockPhotocard;

