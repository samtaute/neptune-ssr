import { DTPlatform } from "../../types/dtTypes";
import { injectScript } from "../util/utils";


//Prep the window to display ads. Needs a platform parameter in order load the correct pubwise scripts. 
//1. Get pubwise script. (note: we are not loading the Pubwise prescript at the moment)
//2 Inject pubwise script into the DOM.
//3. Set up and enable PubAdsServices
export function initAds(platform: DTPlatform){
    const w = window as any; 

    //todo: check if platform is valid. 
    
    const pubwiseScript = getPubwiseScript(platform)
    injectScript(pubwiseScript, {async: "async"}); 

    w.googletag.cmd.push(function () {
        const pubads = w.googletag.pubads(); //returns a reference to PubAdsService, which fetches and shows ads.
  
        pubads.enableSingleRequest(); //enables pubads to request multiple ads in a single request
        pubads.disableInitialLoad(); //Disables requests for ads on page load, but allows ads to be requested with a PubAdsService.refresh call.
        w.googletag.enableServices(); //Enables all GPT services that have been defined for ad slots on the page.
      });

}


function getPubwiseScript(platform: DTPlatform){
    //todo -- load script based on logic
    console.log(platform)
    return "https://fdyn.pubwise.io/script/2c26db5b-4c6b-428a-a959-6edc463b427f/v3/dyn/pws.js?type=ckscoop-english"
}