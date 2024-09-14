import { PageConfig, TemplateProps } from "@/lib/page-generation/types";
import BlockTopStory from "../blocks/BlockTopStory";
import BlockPhotocard from "../blocks/BlockPhotocard";
import BlockAd from "../blocks/BlockAd";
import BlockFortune from "../blocks/reveal_modules/BlockFortune";
import BlockList from "../blocks/BlockList";
import Outbrain from "../providers/Outbrain";
import { ContentStore } from "@/lib/page-generation/content-store";
import BlockEdge from "../blocks/BlockEdge";
import BlockHeader from "../blocks/BlockHeader";

function TemplateDiscover(props: TemplateProps) {
  return (
    <>
      <TopSection {...props} />
      <BottomSection {...props}/>
    </>
  );
}

function TopSection({
  contentStore,
  pageConfig,
}: TemplateProps) {
  const placementId = pageConfig.adBasePath + "top";
  const permalink = pageConfig.outbrainPermalink;

  const { getGalleries, getArticles, getGames, randomizer } = contentStore;
  const randomIndex = Math.floor(randomizer * 10);
  //start here -- what is the best place to pass down outbrain permalink.

  const { galleries, galleriesTitle } = getGalleries([0, 4]);
  return (
    <>
      {randomizer < 0.5 && (
        <BlockTopStory items={galleries.slice(0,1)} priority />
      )}
      {randomizer >= 0.5 && (
        <>
          <BlockHeader text={galleriesTitle} />
          <BlockPhotocard items={galleries.slice(0,1)} priority />
        </>
      )}


      <BlockAd placementId={placementId} />
      <Outbrain layout="edge" widgetId="JS_9" permalink={permalink} />
    </>
  );
}

function BottomSection({
  contentStore,
  pageConfig,
}: TemplateProps) {


  return (
    <>
    <BlockFortune language={pageConfig.language} />
    <BlockList items={contentStore.getArticles([0,4]).articles} />
    </>
  )
}

export default TemplateDiscover;
