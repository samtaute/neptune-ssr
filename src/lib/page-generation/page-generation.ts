import { promises as fs } from "fs";
import { PlatformConfigs } from "./types";
import { ScheduleId } from "../softbox-api/types";
export async function getPlatformConfigs(platform: string){
  const platformFile = await fs.readFile(
    process.cwd() + "/configs/platform_configurations.json",
    "utf-8"
  );
  const platform_configs=JSON.parse(platformFile) as PlatformConfigs[];

  const configs = platform_configs.find((plat)=>{return plat.name===platform})

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

///Helper functions
export function getTemplateId(platform: string, keyword: string) {
  return "daily-brief";
}

export function getCategories(keyword: string) {
  console.log(keyword);
  return ["news", "entertainment", "standard", "html5games"] as ScheduleId[];
}