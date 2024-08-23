import { useOutbrain } from "../../lib/outbrain/useOutbrain";
import BlockEdge from "../BlockLayouts/BlockEdge";
import BlockPhotocard from "../BlockLayouts/BlockPhotocard";
import { ContentEntity } from "../../lib/softbox-api/types";
import { DTLayout } from "../../types/dtTypes";

const DUMMY_URL = "http://www.mobileposse.com/BLU/BLUNEWS/0000/EN";



function Outbrain({layout, widgetId}:{layout: DTLayout, widgetId: string}){
    const permalink = getPermalink(); 

    const items = useOutbrain(permalink, widgetId); 
    const template = getLayoutTemplate(layout, items); 

    return <>
    {template}
    </>
}

export default Outbrain; 


function getPermalink(){
    //todo -- implement logic for getting url from params. for now, just return DUMMY_URL

    return DUMMY_URL; 
}


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

