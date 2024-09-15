import { TemplateProps } from "@/lib/page-generation/types";
import BlockPhotocardFlat from "../blocks/BlockPhotocardFlat";
import BlockPhotocard from "../blocks/BlockPhotocard";
import BlockAd from "../blocks/BlockAd";
import Outbrain from "../providers/Outbrain";
import BlockFortune from "../blocks/reveal_modules/BlockFortune";
import BlockTile from "../blocks/BlockTile";
import BlockHeader from "../blocks/BlockHeader";
import LazyComponent from "../LazyLoad";

function TemplateRelax(props: TemplateProps) {
  return (
    <>
      <TemplateRelaxTop {...props} />
      <TemplateRelaxBottom {...props} />
      <LazyComponent pageConfig={props.pageConfig}/>
    </>
  );
}

export default TemplateRelax;

function TemplateRelaxTop({ contentStore, pageConfig }: TemplateProps) {
  const placementId = pageConfig.adBasePath + "top";
  const permalink = pageConfig.outbrainPermalink;
  const {randomizer, getGalleries} = contentStore;  

  const {galleries, galleriesTitle} = getGalleries([0,1])
  return (
    <>
      <BlockHeader text={galleriesTitle}/>
      {randomizer <= 0.5 && <BlockPhotocardFlat items={galleries} priority/>}
      {randomizer > 0.5 && (
        <BlockPhotocard
        items={galleries}
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
  contentStore,
  pageConfig,
}: TemplateProps) {

  const {randomizer, getGalleries} = contentStore 

  return (
    <>
      {randomizer > 0.5 && <BlockFortune language={pageConfig.language} />}
      {randomizer <= 0.5 && (
        <BlockPhotocard
          items={getGalleries([1, 2]).galleries}
        />
      )}
      <BlockTile items={getGalleries([2, 10]).galleries} />
    </>
  );
}
