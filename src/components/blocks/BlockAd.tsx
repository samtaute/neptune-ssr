import { useEffect } from "react";
const slotId = "mp_ad_unit_TOP";

//todo : add slot Id here
function BlockAd({ placementId }: { placementId: string }) {
  useEffect(() => {
    const w = window as any;
    let retries = 0;
    let timeoutId: NodeJS.Timeout;
    // w.gptadslots = [];
    //check if google and pubwise scripts have been added, then define and render ad. Retry up to 10 times at 10ms intervals.
    if (localStorage.getItem("mp_dnt")) {
      return;
    }
    const checkLoaded = () => {
      if (w.googletag && w.googletag.pubads && w.gptadslots) {
        enableServices();
        defineSlots(placementId);
        w.googletag
          .pubads()
          .setTargeting("pathname", fileNameWithoutExtension())
          .setTargeting("test", "true"
          );
        if(getAppVersion()){
          w.googletag.pubads().setTargeting("app_version", getAppVersion())
        }
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
        <div id={slotId}>
          <div className="bg-[#e9e9e9] w-[300px] h-[250px] min-w-[300] min-h-[25px] max-w-full max-h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default BlockAd;

function defineSlots(placementId: string) {
  const w = window as any;
  w.gptadslots = w.gptadslots || [];
  if (!w.gptadslots[slotId]) {
    w.googletag.cmd.push(function () {
      w.gptadslots[slotId] = w.googletag
        .defineSlot(
          placementId,
          [
            [300, 250],
            [320, 50],
            [320, 100],
            [336, 280],
          ],
          slotId
        )
        .addService(w.googletag.pubads());
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

  return filenameWithoutExtension;
}

function getAppVersion() {
  const w = window as any;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const app_version = urlParams.get("app_version");

  return app_version
}
