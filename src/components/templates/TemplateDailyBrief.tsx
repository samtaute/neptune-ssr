import { ContentEntity } from "../../lib/softbox-api/types";
import BlockEdge from "../blocks/BlockEdge";
import BlockPhotocard from "../blocks/BlockPhotocard";
import BlockAd from "../BlockAd";
import Outbrain from "../providers/Outbrain";
import BlockList from "../blocks/BlockList";
import BlockHeader from "../blocks/BlockHeader";
import BlockTopStory from "../blocks/BlockTopStory";
import BlockFlatPhotocard from "../blocks/BlockFlatPhotocard";

const DUMMY_WIDGET = "JS_6";

type TemplateProps = {
  [key: string]: ContentEntity[];
};

function TemplateDailyBrief({ content }: { content: TemplateProps }) {
  const categories = Object.keys(content);
  const numCategories = categories.length; //use in template
  console.log(numCategories);
  return (
    <>
      <BlockFlatPhotocard items={content["standard"].slice(0, 1)} />
      <BlockEdge items={content["standard"].slice(1, 2)} />

      {/* <BlockAd />
      <BlockTopStory items={content['news'].slice(6, 12)}/>
      <BlockHeader text="Trending Stories" />
      <BlockList items={content["entertainment"].slice(0, 4)} />
      <BlockEdge items={content["news"].slice(1, 6)} />
      <Outbrain widgetId={DUMMY_WIDGET} layout="edge" /> */}
    </>
  );
}
export default TemplateDailyBrief;
