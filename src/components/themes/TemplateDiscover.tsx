import {TemplateProps } from "@/lib/page-generation/types";
import BlockTopStory from "../blocks/BlockTopStory";
import BlockPhotocard from "../blocks/BlockPhotocard";
import BlockAd from "../blocks/BlockAd";
import BlockFortune from "../blocks/reveal_modules/BlockFortune";
import BlockList from "../blocks/BlockList";
import Outbrain from "../providers/Outbrain";
import BlockHeader from "../blocks/BlockHeader";

function TemplateDiscover(props: TemplateProps) {
  return (
    <>
      <TemplateDiscoverTop {...props} />
      <TemplateDiscoverBottom {...props}/>
    </>
  );
}

function TemplateDiscoverTop({
  contentStore,
  pageConfig,
}: TemplateProps) {
  const placementId = pageConfig.adBasePath + "TOP";
  const permalink = pageConfig.outbrainPermalink;

  const {getArticles, randomizer } = contentStore;

  const {articles, articlesTitle} = getArticles([0, 4]);

  return (
    <>
      {randomizer < 0.5 && (
        <BlockTopStory items={articles.slice(0,1)} priority />
      )}
      {randomizer >= 0.5 && (
        <>
          <BlockHeader text={articlesTitle} />
          <BlockPhotocard items={articles.slice(0,1)} priority />
        </>
      )}


      <BlockAd placementId={placementId} />
      <Outbrain layout="edge" widgetId="JS_9" permalink={permalink} />
    </>
  );
}

function TemplateDiscoverBottom({
  contentStore,
  pageConfig,
}: TemplateProps) {


  return (
    <>
    <BlockFortune language={pageConfig.language} />
    <BlockList items={contentStore.getGalleries([0,4]).galleries} />
    </>
  )
}

export default TemplateDiscover;
