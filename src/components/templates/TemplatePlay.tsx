import { TemplateProps } from "@/lib/page-generation/types";
import BlockGamePhotocard from "../blocks/BlockGamePhotocard";
import BlockAd from "../blocks/BlockAd";
import { ContentStore, PageConfig } from "@/lib/page-generation/types";
import BlockHeader from "../blocks/BlockHeader";
import Outbrain from "../providers/Outbrain";
import BlockTile from "../blocks/BlockTile";

// TemplateProps: {
//     content,
//     pageConfig,
//     randomizer
// }

function TemplatePlay(props: TemplateProps) {
  return (
    <>
      <TemplatePlayTop {...props} />
      <TemplatePlayBottom {...props} />
    </>
  );
}

function TemplatePlayTop({ content, pageConfig, randomizer }: TemplateProps) {
  const placementId = pageConfig.adBasePath + "top";
  const permalink = pageConfig.outbrainPermalink;
  const categories = Object.keys(content.library);
  const randomIndex = Math.floor(randomizer * 5)

  //start here -- what is the best place to pass down outbrain permalink.

  return (
    <>
      <BlockHeader text={content.library["games"].title} />
      <BlockGamePhotocard
        items={content.getItemsOfCategory("games", [randomIndex, randomIndex+1])}
        priority
      />
      <BlockAd placementId={placementId} />
      <Outbrain layout="edge" widgetId="JS_16" permalink={permalink} />
      <Outbrain layout="tile" widgetId="JS_9" permalink={permalink} />
    </>
  );
}

function TemplatePlayBottom({
  content,
  pageConfig,
  randomizer,
}: TemplateProps) {
  return (
    <>
      <BlockGamePhotocard items={content.getItemsOfCategory("games", [1, 2])} />
      <BlockTile items={content.getItemsOfCategory("games", [2, 10])} />
    </>
  );
}

export default TemplatePlay;
