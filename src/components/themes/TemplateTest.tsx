import { TemplateProps } from "@/lib/page-generation/types";
import BlockPhotocard from "../blocks/BlockPhotocard";
import BlockPhotocardFlat from "../blocks/BlockPhotocardFlat";
import Outbrain from "../providers/Outbrain";

function TemplateTest({ content, pageConfig, randomizer }: TemplateProps) {
  return (
    <>
       <Outbrain layout="edge" widgetId="JS_16" permalink={pageConfig.outbrainPermalink} />
       <Outbrain layout="tile" widgetId="JS_9" permalink={pageConfig.outbrainPermalink} />
    </>
  );
}

export default TemplateTest;
