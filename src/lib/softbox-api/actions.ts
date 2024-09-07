import { CategoryEntity, ContentStore } from "../page-generation/types";
import { LookbookItem, Interests, ContentEntity } from "./types";

 export async function createContentStore(categories: CategoryEntity[], language: string){
    const store = new ContentStore(); 

    for (const cat of categories) {
        const content = await fetchSoftboxContent(cat.schedule, language);
        if (content) {
          store.addContent(cat, content as ContentEntity[]); 
        }
      }
    if(store.numKeys === 0){
        //todo: more robust error handling here
        console.error('No content returned in store')
    }  
    return store;   
 }


//Fetches content from daily endpont. 
export async function fetchSoftboxContent(category: string, language: string){
        const requestUrl = `${process.env.softboxBaseUrl}/daily?sched=${category}&ckey=${process.env.softboxKey}&mp_lang=${language}&previewAspect=all`; 

        try{
            const response = await fetch(requestUrl);

            if(!response.ok){
                throw new Error(`Http error. Status: ${response.status}`);
            }
            const data = await response.json(); 
            const interests = data.interests
            
           
            return extractItems(data.items.slice(0, 20), language, interests); 
        }catch(error){
            console.error(`Could not fetch ${requestUrl}`, error)
        }    
    }
    
    //Returns clean data from a raw softbox feed.
    export function extractItems(rawItems: LookbookItem[], language: string, interests:Interests){
        let shortenedLang: string = language.substring(0,2); 
    
        //checks if rawItems support language requested, and if not, switch to a supported language. 
        const supportedLangs = rawItems[0]['title'] as object; 
        if (!Object.prototype.hasOwnProperty.call(supportedLangs, shortenedLang)){
            shortenedLang = Object.keys(rawItems[0]['title'])[0];
            console.log('missing language')
        }


    
        return rawItems.map((item)=>{
            const wideImages = item.previews.filter(image=>image.aspect === "9:4"); 
            const squareImage = item.previews.filter(image=>image.aspect === "1:1");
            
            const getPrimaryInterest = ()=>{
                const interestId = item.interests[0];
                const interestName = interests[interestId]['name'][language]
                return interestName
            }
            return {
                title: item['title'][shortenedLang],
                description: item.summary?.[shortenedLang] ? item.summary?.[shortenedLang] : "",
                owner: item['owner'],
                brandLogo: item.brandLogo,
                brandLogoDark: item.brandLogoDark,
                wideImage: wideImages[0]?.link, //todo why are some links not available?
                squareImage: squareImage[0]?.link, //todo get square image
                link: item.link,
                sourceLink: item.sourceLink ? item.sourceLink : null, 
                uid: item.uid,
                primaryInterest: getPrimaryInterest()
            }
        })
    }