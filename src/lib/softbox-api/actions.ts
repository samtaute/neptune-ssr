import { CategoryEntity, ContentStore } from "../page-generation/types";
import { LookbookItem, Interests, ContentEntity } from "./types";

export async function createContentStore(
  categories: CategoryEntity[],
  language: string
) {
  const store = new ContentStore();

  for (const cat of categories) {
    const content = await getDailyContent(cat.schedule, language);
    if (content) {
      store.addContent(cat, content as ContentEntity[]);
    }
  }
  if (store.numKeys === 0) {
    //todo: more robust error handling here
    console.error("No content returned in store");
  }
  return store;
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
export async function getDailyContent(category: string, language: string) {
  let data = await fetchRawDaily(category, language);

  //setup fallbacks
  if(!data || data.items.length === 0){
    data = await fetchRawDaily('standard', language);
  }
  if(!data || data.items.length === 0){
    data = await fetchRawDaily('standard', 'en');
  }
  const interests = data.interests;

  return extractItems(data.items.slice(0, 20), language, interests);
}

//Returns clean data from a raw softbox feed.
export function extractItems(
  rawItems: LookbookItem[],
  language: string,
  interests: Interests
) {
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
    const getPrimaryInterest = () => {
      if (item.interests.length > 0) {
        const interestId = item.interests[0];
        const interestName = interests[interestId]["name"][language];
        return interestName;
      } else return "Reveal";
    };
    return {
      title: item["title"][shortenedLang],
      description: item.summary?.[shortenedLang]
        ? item.summary?.[shortenedLang]
        : "",
      owner: item["owner"],
      brandLogo: item.brandLogo,
      brandLogoDark: item.brandLogoDark,
      wideImage: wideImages[0]?.link ? wideImages[0]?.link : null, //todo why are some links not available?
      squareImage: squareImages[0]?.link ? squareImages[0]?.link : null,
      link: item.link,
      sourceLink: item.sourceLink ? item.sourceLink : null,
      uid: item.uid,
      primaryInterest: getPrimaryInterest(),
      fortune: item.fortune?.fortunetext[shortenedLang]
        ? item.fortune.fortunetext[shortenedLang]
        : "",
    };
  });
}
