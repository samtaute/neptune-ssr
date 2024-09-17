import { TemplateProps } from "@/lib/page-generation/types";
import Outbrain from "../providers/Outbrain";
import BlockEdge from "../blocks/BlockEdge";
import BlockList from "../blocks/BlockList";
import { useEffect } from "react";
import BlockAd from "../blocks/BlockAd";

function TemplateTest({ contentStore, pageConfig}: TemplateProps) {
  const {getGalleries} = contentStore;
  const {galleries} = getGalleries([0,4])

  // useEffect(() => {
  //   const w = window as any; 
  //   w.googletag.cmd.push(() => {
  //     // Request ads for all ad slots defined up to this point.
  //     //
  //     // In many real world scenarios, requesting ads for *all*
  //     // slots is not optimal. Instead, care should be taken to
  //     // only refresh newly added/updated slots.
  //     const slots = Object.values(w.adSlots);
  //     w.googletag.pubads().refresh(slots);
  //   });
  // }, []);

  return (
    <>
      <BlockEdge items={galleries.slice(0,1)}/>
      <BlockAd placementId={pageConfig.adBasePath}/> 
      <BlockList items={galleries.slice(1,4)}/>
    </>
  );
}

export default TemplateTest;
