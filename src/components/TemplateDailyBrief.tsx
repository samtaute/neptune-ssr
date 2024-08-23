import { ContentEntity } from "../lib/softbox-api/types";
import BlockEdge from "./BlockLayouts/BlockEdge";
import BlockPhotocard from "./BlockLayouts/BlockPhotocard";
import BlockAd from "./BlockAd";
import Outbrain from "./providers/Outbrain";
import BlockList from "./BlockLayouts/BlockList";

const DUMMY_WIDGET = "JS_6";

type TemplateProps = {
  [key: string]: ContentEntity[];
};

function TemplateDailyBrief({ content }: { content: TemplateProps }) {
  const categories = Object.keys(content);
  const numCategories = categories.length; //use in template 
  console.log(numCategories)
  return (
    <>
      <BlockPhotocard items={content['standard-latest'].slice(0,1)} />
      <BlockAd/>
      <BlockList items={content['news'].slice(0,4)}/>
      <BlockEdge items ={content['entertainment'].slice(1,6)}/>
      <Outbrain widgetId={DUMMY_WIDGET} layout="edge"/>
    </>
  );
}
export default TemplateDailyBrief;
