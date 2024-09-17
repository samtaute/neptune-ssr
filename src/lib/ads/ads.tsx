import { useEffect } from "react";

let adSlots = {};
let adSlotCount = 0;

if (typeof window !== "undefined") {
  const w = window as any;
  // Ensure we can interact with the GPT command array.
  w.googletag = w.googletag || { cmd: [] };

  // Prepare GPT to display ads.
  w.googletag.cmd.push(() => {
    // Disable initial load, to precisely control when ads are requested.
    w.googletag.pubads().disableInitialLoad();

    // Enable SRA and services.
    w.googletag.pubads().enableSingleRequest();
    w.googletag.enableServices();
  });
}

export function DefineAdSlot({
  adUnit,
  size,
}: {
  adUnit: string;
  size: number[];
}) {
 
  const slotId = `mp_ad_unit_${adSlotCount++}`;

  useEffect(() => {
    const w = window as any;
    w.gptadslots=[]
    if(!w.gptadslots[slotId]){
      w.googletag.cmd.push(() => {
        w.gptadslots[slotId] = w.googletag.defineSlot(adUnit, size, slotId).addService(w.googletag.pubads());
        // if (slot) {
        //   slot.addService(w.googletag.pubads());
        //   w.googletag.display(slot);
        //   w.adSlots[slotId] = slot;
        // }
      });
    }
    renderAd(slotId); 

    return () => {
      w.googletag.cmd.push(() => {
        if (w.adSlots[slotId]) {
          w.googletag.destroySlots([w.adSlots[slotId]]);
          delete w.adSlots[slotId];
        }
      });
    };
  }, [slotId, adUnit, size]);

  return <div id={slotId}> </div>;
}

function renderAd(slotId: string) {
  const w = window as any;
  w.pubwise.que.push(function () {
    w.pubwise.renderAd(slotId);
  });
}

export function RequestAds() {
  const w = window as any;
  useEffect(() => {
    w.googletag.cmd.push(() => {
      // Request ads for all ad slots defined up to this point.
      //
      // In many real world scenarios, requesting ads for *all*
      // slots is not optimal. Instead, care should be taken to
      // only refresh newly added/updated slots.
      const slots = Object.values(adSlots);
      w.googletag.pubads().refresh(slots);
    });
  }, []);
}


/**
 * Determine minimum width and height values for an ad slot container
 * based on the configured slot sizes.
 *
 * This function is only provided for example purposes. See
 * [Minimize layout shift](https://developers.google.com/publisher-tag/guides/minimize-layout-shift)
 * to learn more about strategies for sizing ad slot containers.
 */
function getMinimumSlotSize(size: any) {
    const maxValue = Number.MAX_VALUE;
  
    let minW = Number.MAX_VALUE;
    let minH = Number.MAX_VALUE;
  
    if (Array.isArray(size)) {
      // Convert googletag.SingleSize to googletag.MultiSize for convenience.
      const sizes = size.length <= 2 && !Array.isArray(size[0]) ? [size] : size;
  
      for (const size of sizes) {
        if (Array.isArray(size) && size[0] !== 'fluid') {
          minW = Math.min(size[0], minW);
          minH = Math.min(size[1], minH);
        }
      }
    }
  
    return minW < maxValue && minH < maxValue
      ? // Static ad slot.
        { minWidth: `${minW}px`, minHeight: `${minH}px` }
      : // Fluid ad slot.
        { minWidth: '50%' };
  }
  