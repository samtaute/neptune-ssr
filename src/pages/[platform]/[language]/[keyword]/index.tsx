import { PropsWithChildren } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createContentStore } from "@/lib/softbox-api/actions";
import { ContentStoreEntity, ScheduleId } from "@/lib/softbox-api/types";
import TemplateDailyBrief from "@/components/templates/TemplateDailyBrief";
import Script from "next/script";
import {
  getPaths,
  getPlatformConfigs,
} from "@/lib/page-generation/page-generation";
import { dtLanguages, PlatformConfigs } from "@/lib/page-generation/types";
import { DTLanguage } from "@/types/dtTypes";
import { getTemplateId, getCategories } from "@/lib/page-generation/page-generation";

const DEFAULT_PLATFORM_CONFIGS = {
  name: "firstly",
  product: "daily-brief",
  languages: ["en", "es"],
  adTags: {
    en: {
      unitBasePath: "/180049092/ROS_OM_SNACKTIME_WVIEW_EN_",
      pubwiseScript:
        "https://fdyn.pubwise.io/script/c24055f1-5419-4d4c-8fe9-fc3491f15c71/v3/dyn/pws.js?type=snacktime-english",
      pubwisePreScript:
        "https://fdyn.pubwise.io/script/c24055f1-5419-4d4c-8fe9-fc3491f15c71/v3/dyn/pre_pws.js?type=snacktime-english",
    },
  },
  outbrainPlatformId: "BOOST/FASTNEWS",
};

function FeedPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { templateId, content, platformConfigs, language } = props;
  const template = getTemplate(templateId, content, platformConfigs);

  const pubwiseScript = platformConfigs.adTags[language].pubwiseScript;
  return (
    <>
      <FeedContainer>{template}</FeedContainer>
      <Script src={pubwiseScript} />
    </>
  );
}

export default FeedPage;

//Layout Block
function FeedContainer({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-[450px] min-h-40 min-w-[250px] flex flex-col">
      {children}
    </div>
  );
}

type UrlParams = {
  platform: string;
  language: string;
  keyword: string;
};

export const getStaticProps = (async (context) => {
  const { params } = context;
  const { platform, language, keyword } = params as UrlParams;

  let langProp = language; 
  //sets fallback language to 'en'
  if(!dtLanguages.includes(language)){
    console.log(`${language} not supported`)
    langProp = 'en'; 
  }
  let platformConfigs = await getPlatformConfigs(platform);
  if (!platformConfigs) {
    console.error(`Could not find configs for ${platform}`);
    platformConfigs = DEFAULT_PLATFORM_CONFIGS;
  }

  const categories = getCategories(keyword);
  const content = await createContentStore(categories, langProp);

  const templateId = getTemplateId(platform, keyword);



  return {
    props: {
      content,
      templateId,
      platformConfigs,
      language: langProp,
    },
    revalidate: 1800,
  };
}) satisfies GetStaticProps<{
  content: ContentStoreEntity;
  templateId: string;
  platformConfigs: PlatformConfigs;
  language: string; 
}>;

export const getStaticPaths = async () => {
  return {
    paths: await getPaths(),
    fallback: "blocking", //page will not render until getStaticProps has completed.
  };
};



function getTemplate(id: string, content: ContentStoreEntity, platformConfigs: PlatformConfigs) {
  if (id === "daily-brief") {
    return <TemplateDailyBrief content={content} platformConfigs={platformConfigs}></TemplateDailyBrief>;
  }
}


