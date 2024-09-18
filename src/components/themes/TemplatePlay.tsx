import { TemplateProps } from "@/lib/page-generation/types";
import BlockGamePhotocard from "../blocks/BlockGamePhotocard";
import BlockAd from "../blocks/BlockAd";
import BlockHeader from "../blocks/BlockHeader";
import Outbrain from "../providers/Outbrain";
import BlockTile from "../blocks/BlockTile";
import BlockFortune from "../blocks/reveal_modules/BlockFortune";
import LazyComponent from "../LazyLoad";

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

function TemplatePlayTop({ contentStore, pageConfig }: TemplateProps) {
  const placementId = pageConfig.adBasePath + "TOP";
  const permalink = pageConfig.outbrainPermalink;

  const { getGames, randomizer } = contentStore;
  const { gamesTitle, games } = getGames([0, 1]);

  return (
    <>
      {randomizer > 0.5 && <BlockFortune language={pageConfig.language} />}
      {randomizer <= 0.5 && (
        <>
          <BlockHeader text={gamesTitle} />
          <BlockGamePhotocard items={games} priority />
        </>
      )}
      <BlockAd placementId={placementId} />
      <Outbrain layout="edge" widgetId="JS_9" permalink={permalink} />
    </>
  );
}

function TemplatePlayBottom({ contentStore, pageConfig }: TemplateProps) {
  return (
    <>
      <BlockGamePhotocard items={contentStore.getGames([1, 2]).games} />
      <BlockTile items={contentStore.getGames([2, 11]).games} />
    </>
  );
}

export default TemplatePlay;
