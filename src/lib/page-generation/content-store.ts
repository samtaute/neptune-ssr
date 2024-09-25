import { getDailyContent } from "../softbox-api/actions";
import { ContentEntity } from "../softbox-api/types";
import { pageCategories } from "./page-categories";
import { getAllInterests } from "../softbox-api/actions";
import { FALLBACK_CONTENT } from "./constants";

export type Interest = {
  name: string;
  items: ContentEntity[];
};

export type ItemTree = {
  name: string;
  items: ContentEntity[];
};

//Object created in static props which is used to populate content store. Contains data from Softbox API so that we do not need to make Softbox API calls after the page is loaded.
export type ContentStoreSeed = {
  language: string;
  galleries: Interest[];
  articles: Interest[];
  games: Interest[];
  randomizer: number;
};

//This could potentially be a react context or hook, but since we are just creating it once and passing down to the component tree, and the values don't change, a class does the job.
export class ContentStore {
  galleries: Interest[];
  articles: Interest[];
  games: Interest[];
  language: string;
  randomizer: number;

  constructor(contentSeed: ContentStoreSeed) {
    this.galleries = contentSeed.galleries;
    this.articles = contentSeed.articles;
    this.games = contentSeed.games;
    this.language = contentSeed.language;
    this.randomizer = contentSeed.randomizer;
  }

  getAllGalleries = () => {
    let result: ContentEntity[] = [];
    for (const interest of this.galleries) {
      result = [...result, ...interest.items];
    }
    return { galleries: result, galleriesTitle: "Trending" };
  };

  getAll = () => {
    let result: ContentEntity[] = [];
    for (const interest of this.galleries) {
      result = [...result, ...interest.items];
    }
    for (const interest of this.articles) {
      result = [...result, ...interest.items];
    }
    return result;
  };

  getGalleries = (indices: number[]) => {
    const numCats = this.galleries.length;
    const randomIdx = Math.floor(this.randomizer * numCats);
    const interest = this.galleries[randomIdx];
    const items = interest.items;
    return {
      galleries: items.slice(indices[0], indices[1]),
      galleriesTitle: this.galleries[randomIdx].name,
    };
  };

  getArticles = (indices: number[], interest?: string) => {
    const numCats = this.articles.length;
    const randomIdx = Math.floor(this.randomizer * numCats);
    let news = this.articles.find((interest) => {
      return interest.name === "News";
    });

    if (!news) {
      news = this.articles[0];
    }
    return {
      articles: news.items.slice(indices[0], indices[1]),
      articlesTitle: news.name,
    };
  };
  getGames = (indices: number[], interest?: string) => {
    const numCats = this.games.length;
    const randomIdx = Math.floor(this.randomizer * numCats);
    return {
      games: this.games[randomIdx].items.slice(indices[0], indices[1]),
      gamesTitle: this.games[randomIdx].name,
    };
  };

  getRandomizer = () => {
    return this.randomizer;
  };
}

export function getSchedules(keyword: string, language: string) {
  if (isFSD(keyword)) {
    return ["standard"];
  }
  if (isCategory(keyword)) {
    return [pageCategories[keyword]];
  }
  //default
  return ["html5games", "standard", "dynamic-news"];
}

//FSDs will have 4 consecutive digits in their url page (ex. /en/1000)
function isFSD(keyword: string) {
  const regex = /\d{4}/;
  return regex.test(keyword);
}

//ex. discover-news, discover-entertainment
function isCategory(keyword: string) {
  return Object.hasOwn(pageCategories, keyword);
}

//Object returned will be passed to the ContentStore constructor.
export async function createContentSeed(
  schedules: string[],
  language: string
): Promise<ContentStoreSeed> {
  let items: ContentEntity[] = [];
  const allInterests = await getAllInterests(language);

  for (const schedule of schedules) {
    const newItems = await getDailyContent(schedule, language);
    items = [...items, ...newItems];
  }

  const dedupedItems = dedupe(items);
  //Updates interest counts and filters out interests with 0 count.
  const galleries = createInterests(dedupedItems, allInterests);
  const articles = createInterests(
    dedupe(await getDailyContent("dynamic-news", language)),
    allInterests
  );
  const games = createInterests(
    dedupe((await getDailyContent("html5games", language)).slice(0, 15)),
    allInterests
  );

  return {
    language,
    galleries,
    articles,
    games,
    randomizer: Math.random(),
  };
}

function dedupe(arr: ContentEntity[]) {
  const deduped = arr.reduce((acc: ContentEntity[], item: ContentEntity) => {
    if (!acc.find((it) => it.uid === item.uid)) {
      acc.push(item);
    }
    return acc;
  }, []);
  return deduped;
}

function createInterests(items: ContentEntity[], allInterests: Interest[]) {
  let result = JSON.parse(JSON.stringify([...allInterests])) as Interest[];
  for (const i of items) {
    const currInterest = result.find(
      (interest) => interest.name === i.primaryInterest
    );
    if (currInterest) {
      currInterest.items.push(i);
    }
  }
  result = result.filter((interest) => interest.items.length > 4);
  if (result.length < 1) {
    console.error(
      "requested schedule did not return enough items. returned stale content"
    );
    return FALLBACK_CONTENT as Interest[];
  }
  result.sort((a, b) => b.items.length - a.items.length);
  return result;
}
