import { LookbookItem, Interests, ContentEntity } from "./types";
import { Interest } from "../page-generation/content-store";

interface RawInterest {
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  uid: string;
  priority: number;
  previews: RawInterestPreview[];
  selectable: boolean;
}

interface RawInterestPreview {
  uid: string;
  averageColor: string;
  images: RawInterest[];
  thumbnails: RawInterestThumbnail[];
}

interface RawInterestImage {
  height: number;
  width: number;
  url: string;
}

interface RawInterestThumbnail {
  height: number;
  width: number;
  url: string;
  aspect: string;
}

export async function fetchRawInterests(): Promise<RawInterest[]> {
  const requestUrl = `${process.env.softboxBaseUrl}/interests?ckey=${process.env.softboxKey}`;
  try {
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`Http error. Status: ${response.status}`);
    }
    const data = await response.json();

    return data.interests as RawInterest[];
  } catch (error) {
    console.error(`Could not fetch ${requestUrl}`, error);
    return [];
  }
}

export async function getAllInterests(language: string): Promise<Interest[]> {
  const rawInterests = await fetchRawInterests();
  return extractInterests(rawInterests, language);
}

function extractInterests(
  rawInterests: RawInterest[],
  language: string
): Interest[] {
  let interests = [];
  for (const rawInterest of rawInterests) {
    interests.push({
      name: rawInterest.name[language],
      items: [],
    });
  }
  return interests as Interest[];
}

export async function fetchRawDaily(
  schedule: string,
  language: string,
  previewAspect = "all"
) {
  const requestUrl = `${process.env.softboxBaseUrl}/daily?sched=${schedule}&ckey=${process.env.softboxKey}&mp_lang=${language}&previewAspect=${previewAspect}`;

  try {
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`Http error. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not fetch ${requestUrl}`, error);
  }
}

//Fetches content from daily endpont.
export async function getDailyContent(
  category: string,
  language: string
): Promise<ContentEntity[]> {
  let data = await fetchRawDaily(category, language);

  //setup fallbacks
  let lang = language;
  if (!data || data.items.length === 0) {
    data = await fetchRawDaily("standard", lang);

  }
  if (!data || data.items.length === 0) {
    lang = "en";
    data = await fetchRawDaily("standard", lang);
  }
  const interests = data.interests;

  return extractItems(data.items, lang, interests);
}

//Returns clean data from a raw softbox feed.
export function extractItems(
  rawItems: LookbookItem[],
  language: string,
  interests: Interests
): ContentEntity[] {
  let shortenedLang: string = language.substring(0, 2);

  //checks if rawItems support language requested, and if not, switch to a supported language.
  const supportedLangs = rawItems[0]["title"] as object;
  if (!Object.prototype.hasOwnProperty.call(supportedLangs, shortenedLang)) {
    shortenedLang = Object.keys(rawItems[0]["title"])[0];
    console.log("missing language");
  }

  return rawItems.map((item) => {
    const wideImages = item.previews.filter((image) => image.aspect === "9:4");
    const squareImages = item.previews.filter(
      (image) => image.aspect === "1:1"
    );

    //todo: handle empty interests array
    const getPrimaryInterests = () => {
      const result = []
      if (item.interests.length > 0) {
        for (const interestId of item.interests) {
          const interestName = interests[interestId]["name"][language];
          result.push(interestName)
        }
        return result
      } else return ['reveal']
    };
    return {
      title: item["title"][shortenedLang]!,
      description: item.summary?.[shortenedLang]
        ? item.summary?.[shortenedLang]
        : "",
      owner: item["owner"],
      brandLogo: item.brandLogo,
      brandLogoDark: item.brandLogoDark,
      wideImage: wideImages[0]?.link ? wideImages[0].link : missingImage(item), //todo why are some links not available?
      squareImage: squareImages[0]?.link
        ? squareImages[0].link
        : missingImage(item),
      link: item.link,
      sourceLink: item.sourceLink,
      uid: item.uid,
      type: item.lbtype,
      primaryInterest: getPrimaryInterests()[0],
      interests: getPrimaryInterests(),
      fortune: item.fortune?.fortunetext[shortenedLang]
        ? item.fortune.fortunetext[shortenedLang]
        : "",
    };
  });
}
function missingImage(item: LookbookItem) {
  console.error(`missing image for ${item.link}, ${item.title}`);
  return "https://media.fotoscapes.com/imgs/WJ/fE/jR/jH/B/WJfEjRjHB-26fNjE97iy.webp";
}
