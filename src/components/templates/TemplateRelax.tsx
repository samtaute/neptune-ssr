import { TemplateProps } from "@/lib/page-generation/types";
import BlockPhotocardFlat from "../blocks/BlockPhotocardFlat";
import BlockPhotocard from "../blocks/BlockPhotocard";
import BlockAd from "../blocks/BlockAd";
import Outbrain from "../providers/Outbrain";
import BlockFortune from "../blocks/reveal_modules/BlockFortune";
import BlockTile from "../blocks/BlockTile";
import BlockHeader from "../blocks/BlockHeader";

function TemplateRelax(props: TemplateProps) {
  return (
    <>
      <TemplateRelaxTop {...props} />
      <TemplateRelaxBottom {...props} />
    </>
  );
}

export default TemplateRelax;

function TemplateRelaxTop({ content, pageConfig, randomizer }: TemplateProps) {
  const placementId = pageConfig.adBasePath + "top";
  const permalink = pageConfig.outbrainPermalink;
  const startIndex = Math.floor(randomizer * 5)

  return (
    <>
      {randomizer <= 0.5 && <BlockFortune language={pageConfig.language} />}
      {randomizer > 0.5 && (
        <BlockPhotocard
        items={content.getItemsOfCategory("originals", [startIndex, startIndex+1])}
          priority
        />
      )}
      <BlockAd placementId={placementId} />
      <Outbrain layout="edge" widgetId="JS_16" permalink={permalink} />
      <Outbrain layout="tile" widgetId="JS_9" permalink={permalink} />
    </>
  );
}

function TemplateRelaxBottom({
  content,
  pageConfig,
  randomizer,
}: TemplateProps) {
  const categories = Object.keys(content.library);
  const randomIndex = Math.floor(randomizer * categories.length);

  const randomCategory = categories[randomIndex];

  return (
    <>
      {randomizer > 0.5 && <BlockFortune language={pageConfig.language} />}
      {randomizer <= 0.5 && (
        <BlockPhotocard
          items={content.getItemsOfCategory(randomCategory, [0, 1])}
        />
      )}
      <BlockTile items={content.getItemsOfCategory(randomCategory, [1, 9])} />
    </>
  );
}
