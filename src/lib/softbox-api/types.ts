export interface Translation {
  [key: string]: string | undefined;
}

export interface Image {
  link: string;
  width: number;
  height: number;
}

export interface Preview extends Image {
  aspect: string;
}

export interface KB {
  startX: number;
  startY: number;
  startB: number;
  endX: number;
  endY: number;
  endB: number;
}

export interface LookbookItem {
  title: Translation;
  shortTitle?: Translation;
  summary?: Translation;
  link: string;
  uid: string;
  lbtype: string;
  interests: string[];
  images: Image[];
  previews: Preview[];
  kb: KB;
  owner: string;
  brandLogo: string;
  brandLogoDark: string;
  numImages: number;
  boost: number;
  promote: boolean;
  publishOn: string;
  scheduledOn: string;
  sourceLink?: string;
  fortune?: {
    fortunetext: {
      [key: string]: string
    }
  }
}

export interface ContentEntity {
  title: string;
  description?: string;
  owner: string;
  brandLogo?: string;
  brandLogoDark?: string;
  wideImage: string;
  squareImage: string;
  link: string;
  sourceLink?: string;
  uid: string;
  onViewed?: string;
  primaryInterest?: string;
  fortune?: string; 
}

export type ContentScheduleEntity = ContentEntity[];

export type ContentStoreEntity = {
  [key: string]: ContentScheduleEntity;
};

export type ScheduleId = "news" | "standard" | "entertainment" | "html5games"|"standard-hero";

export interface Interest {
  name: {
    [key: string]: string;
  };
  weight: number;
}

export interface Interests {
  [key: string]: Interest;
}
