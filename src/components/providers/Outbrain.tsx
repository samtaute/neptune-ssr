import { useOutbrain } from "../../lib/outbrain/useOutbrain";
import BlockEdge from "../blocks/BlockEdge";
import BlockPhotocard from "../blocks/BlockPhotocard";
import { ContentEntity } from "../../lib/softbox-api/types";
import { DTLayout } from "../../types/dtTypes";




function Outbrain({layout, widgetId, permalink}:{layout: DTLayout, widgetId: string, permalink: string}){

    const items = useOutbrain(permalink, widgetId); 
    const template = getLayoutTemplate(layout, items); 

    return <>
    {template}
    </>
}

export default Outbrain; 


function getLayoutTemplate(layout:string, items: ContentEntity[]){
    if (layout === 'edge'){
        return <BlockEdge items={items}/>
    }else if (layout === 'photocard'){
        return <BlockPhotocard items={items}/>
    }
    else{
        console.error(`Could not find ${layout} layout type`)
        return <BlockEdge items={items}/>
    }

}

