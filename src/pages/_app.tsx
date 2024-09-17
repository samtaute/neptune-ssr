import "@/styles/globals.css";
import Script from "next/script";
import type { AppProps } from "next/app";
import { IBM_Plex_Sans } from "next/font/google";
import { useEffect } from "react";
import gtm from "@/lib/gtm/gtm";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    gtm.init();
  });

  return (
    <>
      <Script src="https://widgets.outbrain.com/outbrain.js" />

      <Script src="https://tagan.adlightning.com/mobileposse/op.j"></Script>
      <Script id="initWindow">
        {`var w = window;
w.mp_globals = {};
w.mp_globals.pubwise_integration = {};

var gptadslots = w.gptadslots || [];
var googletag = w.googletag || {};
googletag.cmd = googletag.cmd || [];
w.pbjs = w.pbjs || {};
w.pbjs.que = w.pbjs.que || [];
w.pubwise = w.pubwise || {};

w.pubwise.cmd = w.pubwise.cmd || [];
w.pubwise.que = w.pubwise.que || [];
w.pubwise.observers = w.pubwise.observers || [];
w.pubwise.adconfig = w.pubwise.adconfig || [];
w.pubwise.enabled = true;
w.pubwise.extra_bidder_params = w.pubwise.extra_bidder_params || {};
w.pubwise.extra_bidder_params.bids =
w.pubwise.extra_bidder_params.bids || [];`}
      </Script>
      <main className={`${ibmPlexSans.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

{
  /*  */
}
