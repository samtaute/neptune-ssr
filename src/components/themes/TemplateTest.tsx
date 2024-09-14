import { TemplateProps } from "@/lib/page-generation/types";
import Outbrain from "../providers/Outbrain";

function TemplateTest({ contentStore, pageConfig}: TemplateProps) {
  return (
    <>
       <Outbrain layout="edge" widgetId="JS_16" permalink={pageConfig.outbrainPermalink} />
       <Outbrain layout="tile" widgetId="JS_9" permalink={pageConfig.outbrainPermalink} />
    </>
  );
}

export default TemplateTest;
