import { PropsWithChildren, useRef, useEffect, useContext } from "react";
import { ContentEntity } from "../../lib/softbox-api/types";
import { PlatformContext } from "@/pages/[platform]/[language]/[keyword]";
import gtm from "@/lib/gtm/gtm";

function ItemWrapper({item, children, sourceLink}: PropsWithChildren<{item:ContentEntity, sourceLink?:boolean}>){
    const platform = useContext(PlatformContext); 
    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const event = {
        event: "dt_click",
        path: e.currentTarget.pathname,
        publisher: item.owner,
        title: item.title,
      }
      gtm.emit(event)
    }
    return (<ViewabilityWrapper itemData={item}>
        <a href={sourceLink? `${item.sourceLink}?utm_source=${platform}` : `${item.link}?utm_source=${platform}`} onClick={clickHandler}>
            {children}
        </a>
    </ViewabilityWrapper>
)}
   

function ViewabilityWrapper({
    itemData,
    children,
  }: PropsWithChildren<{ itemData: ContentEntity }>) {
    const elementRef = useRef<HTMLDivElement | null>(null);
  
    //set up listener for viewability event
    useEffect(() => {
      if (itemData.onViewed) {
        const w = window as any; 
        const curr = elementRef.current;
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                console.log("element is 50% in viewport " + itemData.onViewed);
                w.OBR.extern.callViewed(itemData.onViewed)
              }
            });
          },
          {
            threshold: 0.5,
          }
        );
        if (elementRef.current) {
          observer.observe(elementRef.current);
        }
  
        return () => {
          if (curr) {
            observer.unobserve(curr);
          }
        };
      }
    });
  
    return <span ref={elementRef} className="w-full">{children}</span>;
  }
  

export default ItemWrapper; 