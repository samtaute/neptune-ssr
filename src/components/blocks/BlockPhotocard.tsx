import { BlockProps } from "../../types/propsTypes";
import Container from "../common/Container";
import ItemWrapper from "../common/ItemWrapper";
import { RoundedImage } from "../common/RoundedImage";
import ItemContentContainer from "../common/ItemContentContainer";
import Logo from "../common/Logo";
import ItemTitle from "../common/ItemTitle";
import ItemFooter from "../common/ItemFooter";

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
              priority={priority ? true : false}
              unoptimized={unoptimized ? true : false}
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

