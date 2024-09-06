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