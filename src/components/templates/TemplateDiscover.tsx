import {
  ContentStore,
  PageConfig,
  TemplateProps,
} from "@/lib/page-generation/types";
import BlockTopStory from "../blocks/BlockTopStory";
import BlockPhotocard from "../blocks/BlockPhotocard";
import BlockAd from "../BlockAd";
import BlockFortune from "../blocks/reveal_modules/BlockFortune";
import BlockList from "../blocks/BlockList";
import Outbrain from "../providers/Outbrain";

function TemplateDiscover(
props
: TemplateProps) {

  return (
    <>
      <TopSection
        {...props}
      />
      <BottomSection {...props}/>
    </>
  );
}

function TopSection({
  content,
  pageConfig,
  randomizer,
}: {
  content: ContentStore;
  pageConfig: PageConfig;
  randomizer: number;
}) {
  const placementId = pageConfig.adBasePath + "top";
  const permalink = pageConfig.outbrainPermalink;
  const categories = Object.keys(content.library);
  const randomCategory = categories[Math.floor(randomizer*categories.length)]
  //start here -- what is the best place to pass down outbrain permalink.

  return (
    <>
      {randomizer < 0.5 && (
        <BlockTopStory
          items={content.getItemsOfCategory(randomCategory, [0, 1])}
          priority
        />
      )}
      {randomizer >= 0.5 && (
        <BlockPhotocard
          items={content.getItemsOfCategory(categories[1], [0, 1])}
          priority
        />
      )}
      <BlockAd placementId={placementId} />
      <Outbrain layout="edge" widgetId="JS_16" permalink={permalink} />
      <Outbrain layout="tile" widgetId="JS_9" permalink={permalink} />
    </>
  );
}

function BottomSection({
  content,
  pageConfig,
  randomizer
}: TemplateProps) {

  const categories = Object.keys(content.library);
  const randomCategory = categories[Math.floor(randomizer*categories.length)]

  return (
    <>
    <BlockFortune language={pageConfig.language} />
    <BlockList items={content.getItemsOfCategory(categories[1], [2, 6])} />
    </>
  )
}

export default TemplateDiscover;
