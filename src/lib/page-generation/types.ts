import { ContentEntity, ContentScheduleEntity } from "../softbox-api/types";

export type TemplateProps = {
  content: ContentStore,
  pageConfig: PageConfig,
  randomizer: number,
}

export type AdTags = {
    [language: string]: {
      unitBasePath: string;
      pubwiseScript: string;
      pubwisePreScript: string; // Optional since it's missing in one of the objects
    };
  };

  export type PlatformConfigs = {
    name: string;
    product: string;
    languages: string[];
    adTags: AdTags;
    outbrainPlatformId: string;
  };

  export const dtLanguages = ['en', 'es']


export type PageConfig = {
  language: string, 
  outbrainPermalink: string, 
  adBasePath: string,
  pubwiseScript: string,
  pubwisePreScript: string, 
}

export class ContentStore {
  library: ContentStoreData; 

  addContent(category: CategoryEntity, items: ContentEntity[]){
    this.library[category.name]={
      ...category,
      items,
    }
  }
  getItemsOfCategory(categoryName: string, indices: number[]){

    if(!this.library[categoryName]){
      console.error(`Could not find items of category ${categoryName}`)
      //todo return mor e evergreen content here
      return [{
        title: "9 of the Wildest Celebrity Purchases",
        owner: "Fotoscapes",
        wideImage: "https://media.fotoscapes.com/imgs/On/fO/pp/Pi/X/OnfOppPiX-p6fqNmg1h0.webp",
        squareImage: "https://media.fotoscapes.com/imgs/On/fO/pp/Pi/X/OnfOppPiX-p6fqNmg1h0.webp",
        link: "https://fotoscapes.com/lookbook/GvfQdXpC4/9-of-the-wildest-celebrity-purchases", 
        uid: "GvfQdXpC4",
      } as ContentEntity]
    }
    const {items} = this.library[categoryName]; 

    const result = items.slice(indices[0], indices[1]); 

    return result; 
  }

  get numKeys():number{
    return Object.keys(this.library).length
  }


  constructor(content = {} as ContentStoreData){
    this.library = content; 
  }

}

export type CategoryEntity = {
  name: string,
  title: string,
  schedule: string,
}

export type ContentStoreData = {
  [key: string]: {
    title: string,
    schedule: string,
    items: ContentEntity[]// array of content items
  }
}