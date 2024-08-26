import { ContentEntity } from "@/lib/softbox-api/types";
import ViewabilityWrapper from "../common/ViewabilityWrapper";
import { PropsWithChildren } from "react";

function ItemWrapper({item, children}: PropsWithChildren<{item:ContentEntity}>){
    return (<ViewabilityWrapper itemData={item}>
        <a href={item.link}>
            {children}
        </a>
    </ViewabilityWrapper>
)}
   

export default ItemWrapper; 