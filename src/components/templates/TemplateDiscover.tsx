import {
  ContentStore,
  PageConfig,
  PlatformConfigs,
} from "@/lib/page-generation/types";
import { ContentStoreEntity } from "@/lib/softbox-api/types";
import BlockTopStory from "../blocks/BlockTopStory";
import BlockPhotocard from "../blocks/BlockPhotocard";
import BlockAd from "../BlockAd";
import Outbrain from "../providers/Outbrain";
import BlockTile from "../blocks/BlockTile";
import BlockFortune from "../blocks/reveal_modules/BlockFortune";

function TemplateDiscover({
  content,
  pageConfig,
  randomizer,
}: {
  content: ContentStore;
  pageConfig: PageConfig;
  randomizer: number;
}) {
  const categories = Object.keys(content);
  const numCategories = categories.length;

  return (
    <>
      <TopSection
        content={content}
        pageConfig={pageConfig}
        randomizer={randomizer}
      />
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
  const categories = Object.keys(content.content);
  //start here -- what is the best place to pass down outbrain permalink.

  return (
    <>
      {randomizer === 0 && (
        <BlockTopStory
          items={content.getItemsOfCategory(categories[1], [0,1])}
          priority
        />
      )}
      {randomizer > 0 && (
        <BlockPhotocard
          items={content.getItemsOfCategory(categories[1], [0,1])}
          priority
        />
      )}
      <BlockAd placementId={placementId}/>
      <BlockFortune language={pageConfig.language}/>
      <BlockTile items={content.getItemsOfCategory(categories[1], [2,6])}/>
      
    </>
  );
}

function BottomSection({
  content,
  pageConfig,
}: {
  content: ContentStore;
  pageConfig: PageConfig;
}) {
  const randomizer = Math.floor(Math.random() * 2);
  let section;
  if (randomizer === 0) {
    section = <div>test</div>;
  } else {
    section = <div>test</div>;
  }
  return section;
}

export default TemplateDiscover;
