import { BlockProps } from "@/types/propsTypes";
import Logo from "../common/Logo";
import ItemFooter from "../common/ItemFooter";
import Container from "../common/Container";
import { RoundedImage } from "../common/RoundedImage";
import ItemWrapper from "../common/ItemWrapper";

function BlockPhotocardFlat({ items, priority }: BlockProps) {
  return (
    <Container>
      {items.map((item) => {
        return (
          <ItemWrapper key={item.uid} item={item}>
            <div className="flex pb-3 flex-col items-center gap-3 rounded-lg shadow-lg bg-white w-full">
              <RoundedImage
                image={item.squareImage}
                className="h-[340px] w-full"
                priority={priority ? true : false}
              >
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
                <ItemFooter interest={item.primaryInterest} />
              </div>
            </div>
          </ItemWrapper>
        );
      })}
    </Container>
  );
}

export default BlockPhotocardFlat;
