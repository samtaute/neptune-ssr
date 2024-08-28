import { BlockProps } from "@/types/propsTypes";
import Container from "../block-elements/Container";
import ItemWrapper from "../block-elements/ItemWrapper";
import { RoundedImage } from "../block-elements/RoundedImage";

function BlockGamePhotocard({ items, priority }: BlockProps) {
  return (
    <Container>
      {items.map((item) => {
        return (
          <ItemWrapper key={item.uid} item={item} sourceLink>
            <div className="pb-5">
              <RoundedImage
                image={item.squareImage}
                gradient={true}
                className="h-[406px]"
                priority={priority}
                gameGradient
              >
                <div className="flex flex-col p-4 pt-0 gap-5 items-center z-20">
                  <div className="text-white text-center font-sans text-xl font-bold">
                    {item.title}
                  </div>
                  <div className="flex p-2 justify-center items-center rounded-xl bg-white bg-opacity-20">
                    <span className="text-white text-center font-sans text-sm">
                      Play Now
                    </span>
                  </div>
                </div>
              </RoundedImage>
            </div>
          </ItemWrapper>
        );
      })}
    </Container>
  );
}

export default BlockGamePhotocard;
