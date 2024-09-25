import { GetStaticProps, InferGetStaticPropsType } from "next";
import TemplateDiscover from "@/components/themes/TemplateDiscover";
import Script from "next/script";
import {
  getPlatformConfigs,
  manualGetPaths,
} from "@/lib/page-generation/page-generation";
import { PageConfig } from "@/lib/page-generation/types";
import {
  getTemplateId,
} from "@/lib/page-generation/page-generation";
import TemplatePlay from "@/components/themes/TemplatePlay";
import TemplateRelax from "@/components/themes/TemplateRelax";
import TemplateTest from "@/components/themes/TemplateTest";
import gtm, { getMpid } from "@/lib/gtm/gtm";
import { useEffect} from "react";
import { getAAID } from "@/lib/gtm/gtm";
import {
  LS_BRIDGE_APP_VERSION_MP,
  LS_BRIDGE_MODE_INTERNAL,
  LS_BRIDGE_UUID_INTERNAL,
} from "@/lib/gtm/constants";
import {
  DEFAULT_PLATFORM_CONFIGS,
  DT_LANGUAGES,
} from "@/lib/page-generation/constants";
import {
  ContentStore,
  ContentStoreSeed,
  createContentSeed,
  getSchedules,
} from "@/lib/page-generation/content-store";
import { createContext } from "react";

export const PlatformContext = createContext('mp-firstly'); //default platform name


function FeedPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { templateId, contentSeed, pageConfig } = props;
  const contentStore = new ContentStore(contentSeed);

  const template = getTemplate(templateId, contentStore, pageConfig);

  const pubwiseScript = pageConfig.pubwiseScript;
  useEffect(() => {
    const event = {
      event: "neptune_page_view",
      aaid: getAAID() || null,
      appVersion: localStorage.getItem(LS_BRIDGE_APP_VERSION_MP) || null,
      mode: localStorage.getItem(LS_BRIDGE_MODE_INTERNAL) || null,
      mpid: getMpid() || null,
      partner: pageConfig.platform || null,
      platform: pageConfig.platform || null,
      userId: localStorage.getItem(LS_BRIDGE_UUID_INTERNAL) || null,
      user_agent: navigator.userAgent,
      // user_agent_browser: extra?.browser || null,
      // user_agent_browser_version: extra?.browserVersion || null,
      // user_agent_mobile: extra?.mobile !== undefined ? extra.mobile : null,
      // user_agent_model: extra?.model || null,
      // user_agent_platform: extra?.platform || null,
      // user_agent_platform_version: extra?.platformVersion || null
    };
    gtm.emit(event);
  },[pageConfig.platform]);

  return (
    <PlatformContext.Provider value={`mp-${pageConfig.platform}`}>
      <div className="mx-auto max-w-[450px] min-h-40 min-w-[250px] flex flex-col">
        {template}
      </div>
      <Script src={pubwiseScript} />
    </PlatformContext.Provider>
  );
}

export default FeedPage;

type UrlParams = {
  platform: string;
  language: string;
  keyword: string;
};

export const getStaticProps = (async (context) => {
  //Extract data from params
  const { params } = context;
  const { platform, language, keyword } = params as UrlParams;

  //Set up 'en' as fallback for language
  let langProp = language;
  if (!DT_LANGUAGES.includes(language)) {
    console.log(`${language} not supported`);
    langProp = "en";
  }
  //Get platform configs or use default configs
  let platformConfigs = await getPlatformConfigs(platform);
  if (!platformConfigs) {
    console.error(`Could not find configs for ${platform}`);
    platformConfigs = DEFAULT_PLATFORM_CONFIGS;
  }

  //Set up remaining properties for FeedPage
  const templateId = getTemplateId(platform, keyword);
  const schedules = getSchedules(keyword, langProp); //will return \categories required by page. For instance, the "discover-lifestyle" must have lifestyle as a category.
  const contentSeed = await createContentSeed(schedules, language);

  //set up page config
  const obId = platformConfigs.outbrainPlatformId;
  const pageLang = DT_LANGUAGES.includes(language) ? language : "en"; //set en as fallback

  const pageConfig: PageConfig = {
    platform: platformConfigs.name,
    language: pageLang,
    outbrainPermalink: `http://www.mobileposse.com/${obId}/${keyword}/${language}`,
    adBasePath: platformConfigs.adTags[pageLang].unitBasePath,
    pubwiseScript: platformConfigs.adTags[pageLang].pubwiseScript,
    pubwisePreScript: platformConfigs.adTags[pageLang].pubwisePreScript,
  };

  return {
    props: {
      contentSeed: contentSeed,
      templateId,
      pageConfig,
    },
    revalidate: 3600,
  };
}) satisfies GetStaticProps<{
  contentSeed: ContentStoreSeed;
  templateId: string;
  pageConfig: PageConfig;
}>;

export const getStaticPaths = async () => {
  return {
    // paths: await getPaths(),
    paths: await manualGetPaths(),
    fallback: "blocking", //page will not render until getStaticProps has completed.
  };
};

function getTemplate(
  id: string,
  content: ContentStore,
  pageConfig: PageConfig
) {
  const props = {
    contentStore: content,
    pageConfig,
  };
  if (id === "discover") {
    return <TemplateDiscover {...props}></TemplateDiscover>;
  } else if (id === "play") {
    return <TemplatePlay {...props} />;
  } else if (id === "test") {
    return <TemplateTest {...props} />;
  } else {
    return <TemplateRelax {...props} />;
  }
}
