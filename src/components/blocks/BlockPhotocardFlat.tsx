import { BlockProps } from "@/types/propsTypes";
import Logo from "../block-elements/Logo";
import ItemFooter from "../block-elements/ItemFooter";
import Container from "../block-elements/Container";
import { RoundedImage } from "../block-elements/RoundedImage";
import ItemWrapper from "../block-elements/ItemWrapper";

function BlockPhotocardFlat({ items, priority }: BlockProps) {
  return (
    <Container>
 {items.map((item) => {
        return (
          <ItemWrapper key={item.uid} item={item}>
              <div className="flex pb-3 flex-col items-center gap-3 rounded-lg shadow-lg bg-white w-full">
                <RoundedImage image={item.squareImage} className="h-[340px] w-full" priority={priority}>
                  {item.brandLogo && (
                    <Logo
                      src={item.brandLogo}
                      className="absolute left-4 top-4 h-5"
                    />
                  )}
                </RoundedImage>
                <div className="flex px-4 flex-col gap-2 self-stretch">
                  <div>
                    <span className="text-lg font-semibold font-sans leading-6">
                      {item.title}
                    </span>
                  </div>
                  <ItemFooter interest={item.primaryInterest}/>
                </div>
              </div>
          </ItemWrapper>
        );
      })}
    </Container>
  );
}

export default BlockPhotocardFlat;