import { useOutbrain } from "../../lib/outbrain/useOutbrain";
import BlockEdge from "../blocks/BlockEdge";
import BlockPhotocard from "../blocks/BlockPhotocard";
import { ContentEntity } from "../../lib/softbox-api/types";
import { DTLayout } from "../../types/dtTypes";
import BlockTile from "../blocks/BlockTile";

function Outbrain({
  layout,
  widgetId,
  permalink,
}: {
  layout: DTLayout;
  widgetId: string;
  permalink: string;
}) {
  const items = useOutbrain(permalink, widgetId);
  const template = getLayoutTemplate(layout, items);

  return (
    <>
      {items.length > 0 && template}
      {items.length === 0 && <OutbrainSkeleton />}
    </>
  );
}

export default Outbrain;

function getLayoutTemplate(layout: string, items: ContentEntity[]) {
  if (layout === "edge") {
    return <BlockEdge items={items} unoptimized />;
  } else if (layout === "photocard") {
    return <BlockPhotocard items={items} unoptimized />;
  } else if (layout === "tile") {
    return <BlockTile items={items} unoptimized />;
  } else {
    console.error(`Could not find ${layout} layout type`);
    return <BlockEdge items={items} />;
  }
}

function OutbrainSkeleton() {
  return (
    <div className="h-[800px] p-4 pt-0">
      <div className="h-full w-full bg-[#d3d3d3]"></div>
    </div>
  );
}
