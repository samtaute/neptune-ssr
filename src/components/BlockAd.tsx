import { useEffect } from "react";

function BlockAd() {
  useEffect(() => {
    const w = window as any;
    let retries = 0;
    let timeoutId: NodeJS.Timeout;
    w.gptadslots = []; 
    //check if google and pubwise scripts have been added, then define and render ad. Retry up to 10 times at 10ms intervals.
    const checkLoaded = () => {
      if (w.googletag && w.googletag.pubads && w.gptadslots) {
        enableServices(); 
        defineSlots();
        renderAd();
      } else if (retries < 1000) {
        retries += 1;
        timeoutId = setTimeout(checkLoaded, 50);
      } else {
        console.warn("failed to load pubwise and gpt");
      }
    };
    checkLoaded();
    return ()=>{
      if(timeoutId){
        clearTimeout(timeoutId)
      }
    }
  }, []);

  return (
    <div className="flex w-full justify-center m-2">
      <div className="w-[300px] h-[250px]" id="div-1"></div>
    </div>
  );
}

export default BlockAd;

function defineSlots() {
  const w = window as any; 
  if (!w.gptadslots[`div-1`]) {
    w.googletag.cmd.push(function () {
      w.gptadslots["div-1"] = w.googletag
        .defineSlot("/180049092/ROS_CK_SCOOP_WVIEW_EN_TOP", [300, 250], "div-1")
        .addService(w.googletag.pubads());
      console.log("pushed");
    });
  }

  w.googletag.pubads();
}

function renderAd() {
  const w = window as any; 
  w.pubwise.que.push(function () {
    w.pubwise.renderAd("div-1");
  });
}

function enableServices(){
  const w = window as any; 
  w.googletag.cmd.push(function () {
    const pubads = w.googletag.pubads(); //returns a reference to PubAdsService, which fetches and shows ads.

    pubads.enableSingleRequest(); //enables pubads to request multiple ads in a single request
    pubads.disableInitialLoad(); //Disables requests for ads on page load, but allows ads to be requested with a PubAdsService.refresh call.
    w.googletag.enableServices(); //Enables all GPT services that have been defined for ad slots on the page.
  });
}

