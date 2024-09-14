import { ContentEntity } from "../softbox-api/types";
import { ContentStore } from "./content-store";

export type TemplateProps = {
  contentStore: ContentStore,
  pageConfig: PageConfig,
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



export type PageConfig = {
  platform: string, 
  language: string, 
  outbrainPermalink: string, 
  adBasePath: string,
  pubwiseScript: string,
  pubwisePreScript: string, 
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