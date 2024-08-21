import {promises as fs} from 'fs'

export async function getPaths(){
    const platformFile = await fs.readFile(process.cwd()+'/configs/platform_configurations.json', 'utf-8')
    const platform_configs = JSON.parse(platformFile); 

    const productMapFile = await fs.readFile(process.cwd()+'/configs/product_map.json', 'utf-8')
    const productMap = JSON.parse(productMapFile)
  
    const paths = []; 
    for (const platform of platform_configs){
      for (const language of platform.languages){
        const keywords = productMap['dailyBrief']; 
        for (const keyword of keywords){
          paths.push({params: {platform: platform.name, language, keyword}})
        }
      }
    }
    return paths; 
  }