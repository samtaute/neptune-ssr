import { useEffect } from "react";
const slotId = "mp_ad_unit_top";


//todo : add slot Id here
function BlockAd({ placementId }: { placementId: string }) {
  useEffect(() => {
    const w = window as any;
    let retries = 0;
    let timeoutId: NodeJS.Timeout;
    // w.gptadslots = [];
    //check if google and pubwise scripts have been added, then define and render ad. Retry up to 10 times at 10ms intervals.
    const checkLoaded = () => {
      if (w.googletag && w.googletag.pubads && w.gptadslots) {
        enableServices();
        defineSlots(placementId);
        renderAd();
      } else if (retries < 1000) {
        retries += 1;
        timeoutId = setTimeout(checkLoaded, 50);
      } else {
        console.warn("failed to load pubwise and gpt");
      }
    };
    checkLoaded();
    return () => {
      const slotId = "mp_ad_unit_top";
      w.adSlots = w.adSlots ? w.adSlots : [];
      w.googletag.cmd.push(() => {
        if (w.adSlots[slotId]) {
          w.googletag.destroySlots([w.adSlots[slotId]]);
          delete w.adSlots[slotId];
        }
      });
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [placementId]);

  return (
    <div className="flex w-full justify-center mb-5">
      <div className="flex flex-col items-center">
        <div className="text-xs text-[#666]">Advertisement</div>
        <div className="w-[300px] h-[250px] bg-[#e9e9e9]" id={slotId}></div>
      </div>
    </div>
  );
}

export default BlockAd;

function defineSlots(placementId: string) {
  const w = window as any;
  if (!w.gptadslots[slotId]) {
    w.googletag.cmd.push(function () {
      w.gptadslots[slotId] = w.googletag
        .defineSlot(placementId, [[300, 250],[320, 50],[320,100],[336,280]], slotId)
        .addService(w.googletag.pubads())
        .setTargeting("pathname", fileNameWithoutExtension())
        .setTargeting("mp_app_version", getAppVersion());
      console.log("pushed");
    });
  }

  w.googletag.pubads();
}

function renderAd() {
  const w = window as any;
  w.pubwise.que.push(function () {
    w.pubwise.renderAd(slotId);
  });
}

function enableServices() {
  const w = window as any;
  w.googletag.cmd.push(function () {
    const pubads = w.googletag.pubads(); //returns a reference to PubAdsService, which fetches and shows ads.

    pubads.enableSingleRequest(); //enables pubads to request multiple ads in a single request
    pubads.disableInitialLoad(); //Disables requests for ads on page load, but allows ads to be requested with a PubAdsService.refresh call.
    w.googletag.enableServices(); //Enables all GPT services that have been defined for ad slots on the page.
  });
}


function fileNameWithoutExtension() {
  const w = window as any;
  // Strip pathname to only filename for targeting.
  const pathnameMap = window.location.pathname.split("/");
  const filename = pathnameMap[pathnameMap.length - 1];
  const filenameWithoutExtension = filename.split(".html")[0];
  return fileNameWithoutExtension; 
}

function getAppVersion(){
  return localStorage.getItem('mp_mpAppVersion')
}