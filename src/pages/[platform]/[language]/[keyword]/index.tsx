import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createContentStore } from "@/lib/softbox-api/actions";
import TemplateDiscover from "@/components/templates/TemplateDiscover";
import Script from "next/script";
import {
  getPaths,
  getPlatformConfigs,
  manualGetPaths,
} from "@/lib/page-generation/page-generation";
import { ContentStore, ContentStoreData, dtLanguages, PageConfig} from "@/lib/page-generation/types";
import { getTemplateId, getCategories } from "@/lib/page-generation/page-generation";
import TemplatePlay from "@/components/templates/TemplatePlay";
import TemplateRelax from "@/components/templates/TemplateRelax";
import TemplateTest from "@/components/templates/TemplateTest";
import gtm, { getMpid } from "@/lib/gtm/gtm";
import { useEffect } from "react";
import { getAAID } from "@/lib/gtm/gtm";
import { LS_BRIDGE_APP_VERSION_MP, LS_BRIDGE_MODE_INTERNAL, LS_BRIDGE_UUID_INTERNAL } from "@/lib/gtm/constants";
import { DEFAULT_PLATFORM_CONFIGS } from "@/lib/page-generation/constants";


function FeedPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { templateId, content, pageConfig, randomizer } = props;
  
  const contentStore = new ContentStore(content)
  const template = getTemplate(templateId, contentStore, pageConfig, randomizer);
  const pubwiseScript = pageConfig.pubwiseScript;
  useEffect(()=>{
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
    }
    gtm.emit(event)
  })




  return (
    <>
      <div className="mx-auto max-w-[450px] min-h-40 min-w-[250px] flex flex-col">{template}</div>
      <Script src={pubwiseScript} />
    </>
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
  if(!dtLanguages.includes(language)){
    console.log(`${language} not supported`)
    langProp = 'en'; 
  }
  //Get platform configs or use default configs
  let platformConfigs = await getPlatformConfigs(platform);
  if (!platformConfigs) {
    console.error(`Could not find configs for ${platform}`);
    platformConfigs = DEFAULT_PLATFORM_CONFIGS;
  }


  //Set up remaining properties for FeedPage
  const templateId = getTemplateId(platform, keyword);
  const categories = await getCategories(templateId); //used only for fetching content\
  const content = await createContentStore(categories, langProp);

  //set up page config
  const obId = platformConfigs.outbrainPlatformId
  const pageLang = dtLanguages.includes(language) ? language : "en" //set en as fallback

  const pageConfig: PageConfig = {
    platform: platformConfigs.name, 
    language: pageLang,
    outbrainPermalink: `http://www.mobileposse.com/${obId}/${keyword}/${language}`,
    adBasePath: platformConfigs.adTags[pageLang].unitBasePath,
    pubwiseScript: platformConfigs.adTags[pageLang].pubwiseScript,
    pubwisePreScript: platformConfigs.adTags[pageLang].pubwisePreScript,
  }

  const randomizer = Math.random(); 

  return {
    props: {
      content: content.library,
      templateId,
      pageConfig,
      randomizer,
    },
    revalidate: 1800,
  };
}) satisfies GetStaticProps<{
  content: ContentStoreData;
  templateId: string;
  pageConfig:  PageConfig; 
  randomizer: number; 
}>;

export const getStaticPaths = async () => {
  return {
    // paths: await getPaths(),
    paths: await manualGetPaths(), 
    fallback: "blocking", //page will not render until getStaticProps has completed.
    
  };
};



function getTemplate(id: string, content: ContentStore, pageConfig: PageConfig, randomizer: number) {
    const props = {
      content,
      pageConfig,
      randomizer
    }
    if(id === 'discover'){
      return <TemplateDiscover {...props}></TemplateDiscover>;
    }else if(id==='play'){
      return <TemplatePlay {...props}/>
    }else if (id==='test'){
      return <TemplateTest {...props}/>
    } else {
      return <TemplateRelax {...props}/>
    }   
}


