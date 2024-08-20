import { ContentEntity } from "../softbox-api/types";
import { checkScriptLoaded } from "../util/utils";
import { useState, useEffect } from "react";

const DUMMY_KEY = "MOBIL10GC607HEAPB660KCI89";


export function useOutbrain(permalink: string, widgetId: string){
  const [sponsoredItems, setSponsoredItems] = useState<ContentEntity[]>([]);

  useEffect(() => {
    const callback = () => {
      const ob = new OutbrainCallbackWrapper(setSponsoredItems);
      const requestData = {permalink, widgetId, installationKey: DUMMY_KEY}
      fetchOutbrainItems(ob, requestData);
    };
    checkScriptLoaded("OBR", callback, 5, 25); //executes callback if outbrain script has loaded. If not, retries up to 10 times at 25ms intervals
  }, [permalink, widgetId]);

  return sponsoredItems

}

//In order 
export class OutbrainCallbackWrapper {
  setItems: React.Dispatch<React.SetStateAction<ContentEntity[]>>;

  outbrainCallback = (json: OutbrainResponse) => {
    const content = [] as ContentEntity[];
    for (let i = 0; i < json.doc.length; i++) {
      const item = json.doc[i];
      content.push({
        title: item.content,
        owner: item.source_display_name,
        wideImage: item.thumbnail.url,
        link: item.url,
        onViewed: item["on-viewed"][0],
        uid: item.url
      });
    }
    this.setItems(content)
  };

  constructor(setItems: React.Dispatch<React.SetStateAction<ContentEntity[]>>) {
    this.setItems = setItems;
  }
}

export function outbrainCallbackError(error: any) {
  console.error(error);
}

//todo -- logic for using correct url instead of dummy dat
export function fetchOutbrainItems(ob: OutbrainCallbackWrapper, requestData: {permalink: string, widgetId: string, installationKey: string}) {
  const w = window as any;
  w.OBR.extern.callRecs(requestData,ob.outbrainCallback, outbrainCallbackError);
}

export type OutbrainResponse = {
  doc: OutbrainResponseItem[];
};

export type OutbrainResponseItem = {
  content: string;
  url: string;
  orig_url?: string;
  source_display_name: string;
  pc_id?: string;
  author?: string;
  desc?: string;
  thumbnail: {
    url: string,
    width: number, 
    height: number
  }
  isVideo?: boolean;
  'on-viewed': string[]
};
