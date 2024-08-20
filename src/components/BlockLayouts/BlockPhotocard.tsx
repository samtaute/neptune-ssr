// export interface ContentEntity
// {
//     title: string,
//     description?: string,
//     owner: string,
//     brandLogo: string,
//     brandLogoDark: string,
//     wideImage: string,
//     link: string,
// }
import { PropsWithChildren } from "react";
import { BlockProps } from "../../types/propsTypes";
import ViewabilityWrapper from "../common/ViewabilityWrapper";

function BlockPhotocard({ items }: BlockProps ) {

  return (
    <>
      {items.map((item) => {
        return (
          <ViewabilityWrapper key={item.uid} itemData={item}>
            <PhotocardContainer
              link={item.link}
              image={item.wideImage}
            >
              {item.brandLogo && <PhotocardLogo logo={item.brandLogo} />}
              <PhotocardTitle title={item.title}></PhotocardTitle>
              <PhotocardFooter />
            </PhotocardContainer>
          </ViewabilityWrapper>
        );
      })}
    </>
  );
}

export default BlockPhotocard;

function PhotocardContainer({
  children,
  link,
  image,
}: PropsWithChildren<{ link: string; image: string }>) {
  const backgroundImage = {
    backgroundImage: `linear-gradient(0deg, rgba(0, 3, 21, 0.85) 0%, rgba(0, 3, 21, 0) 70%, rgba(0, 3, 21, 0) 70%, rgba(0, 3, 21, 0) 100%), url(${image})`,
  };

  return (
    <a
      style={backgroundImage}
      href={link}
      className={
        "relative flex flex-col rounded-lg bg-cover h-[254px] justify-end p-4 mb-4"
      }
    >
      {children}
    </a>
  );
}

export function PhotocardTitle({ title }: { title: string }) {
  return (
    <h2 className="text-white text-base drop-shadow-sm font-semibold my-2">
      {title}
    </h2>
  );
}

export function PhotocardLogo({ logo }: { logo: string }) {
  return (
    <div className="flex items-start">
      <img src={logo} alt="publisher logo" className="h-4" />
    </div>
  );
}

function PhotocardFooter() {
  return (
    <div className="h-6 text-[#ededed] flex items-end justify-between">
      <div className="text-[11px] font-normal text-white">popular</div>
    </div>
  );
}
