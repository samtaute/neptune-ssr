import { promises as fs } from "fs";
import { CategoryEntity, PlatformConfigs } from "./types";

export async function getPlatformConfigs(platform: string) {
  const platformFile = await fs.readFile(
    process.cwd() + "/configs/platform_configurations.json",
    "utf-8"
  );
  const platform_configs = JSON.parse(platformFile) as PlatformConfigs[];

  const configs = platform_configs.find((plat) => {
    return plat.name === platform;
  });

  return configs;
}

//Determines which urls to generate static pages for.
export async function getPaths() {
  const platformFile = await fs.readFile(
    process.cwd() + "/configs/platform_configurations.json",
    "utf-8"
  );
  const platform_configs = JSON.parse(platformFile);

  const productMapFile = await fs.readFile(
    process.cwd() + "/configs/product_map.json",
    "utf-8"
  );
  const productMap = JSON.parse(productMapFile);

  const paths = [];
  for (const platform of platform_configs) {
    for (const language of platform.languages) {
      const keywords = productMap["dailyBrief"];
      for (const keyword of keywords) {
        paths.push({ params: { platform: platform.name, language, keyword } });
      }
    }
  }
  return paths;
}

export async function manualGetPaths() {
  const paths = [
    { params: { platform: "boost", language: "en", keyword: "0000" } },
    { params: { platform: "boost", language: "en", keyword: "0600" } },
    { params: { platform: "boost", language: "en", keyword: "1200" } },
    { params: { platform: "boost", language: "en", keyword: "1600" } },
    { params: { platform: "boost", language: "en", keyword: "2000" } },
    { params: { platform: "boost", language: "en", keyword: "test" } },

    { params: { platform: "tracfonebar", language: "en", keyword: "discover-games" } },
    { params: { platform: "tracfonebar", language: "en", keyword: "discover-style" } },
    { params: { platform: "cricket", language: "es", keyword: "0000" } },
    { params: { platform: "cricket", language: "es", keyword: "1200" } },
    { params: { platform: "cricket", language: "en", keyword: "1000" } },
  ];
  return paths
}

//Returns a theme template at random.
export function getTemplateId(platform: string, keyword: string) {
  const themes = ["discover", "play", "relax"];
  const random = Math.floor(Math.random() * 5);

  //If daily brief, return a theme at random
  if (hasFourConsecutiveNumerals(keyword)) {
    if (random === 1 || random === 2){
      return 'discover'
    } 
    if (random === 3 || random === 4){
      return  'relax'
    }
    else return 'play'
  } else if (keyword === "discover-games") {
    return "play";
  } else if (keyword === "discover-style") {
    return "relax";
  } else if (keyword === "test"){
    return "test"
  }else return themes[random];
}

function hasFourConsecutiveNumerals(str: string) {
  const regex = /\d{4}/;
  return regex.test(str);
}

export async function getCategories(templateId: string) {
  const categoriesFile = await fs.readFile(
    process.cwd() + "/configs/categories.json",
    "utf-8"
  );
  const parsedFile = JSON.parse(categoriesFile);
  const allCategories = parsedFile.categories as CategoryEntity[];

  const numCategories = allCategories.length;

  let result = allCategories.filter(
    (category) => category.name === "originals" || category.name === "games" 
  );
  while (result.length < 5) {
    const random = Math.floor(Math.random() * numCategories);
    if (!result.includes(allCategories[random])) {
      result.push(allCategories[random]);
    }
  }
  return result;
}
