import "@/styles/globals.css";
import Script from "next/script";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <Component {...pageProps} />;
        <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" />
        <Script src="https://widgets.outbrain.com/outbrain.js"/>
    </>

  )


}
