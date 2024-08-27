import { ContentEntity } from "../lib/softbox-api/types";

export interface BlockProps {
    items: ContentEntity[]; 
    priority?: boolean;
    showDescription?: boolean; 
}

