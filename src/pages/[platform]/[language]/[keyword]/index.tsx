import { useEffect, PropsWithChildren } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createContentStore} from "@/lib/softbox-api/actions";
import {
  ContentStoreEntity,
  ScheduleId,
} from "@/lib/softbox-api/types";
import TemplateDailyBrief from "@/components/TemplateDailyBrief";
import Script from "next/script";


function FeedPage(props: InferGetStaticPropsType<typeof getStaticProps>) {

  const {templateId, content, pubwiseScript} = props; 

  const template = getTemplate(templateId, content); 

  return (
    <>
      <FeedContainer>
       {template}
      </FeedContainer>
      <Script src={pubwiseScript}/>
    </>
  );
}

export default FeedPage;

function getTemplate(id: string, content: ContentStoreEntity){
  if(id === 'daily-brief'){
    return <TemplateDailyBrief content={content}></TemplateDailyBrief>
  }

}

function FeedContainer({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-[450px] px-[20px] min-h-40 flex flex-col">
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

  const categories = getCategories(keyword);
  const content = await createContentStore(categories, language); 
  const templateId = getTemplateId(platform, keyword); 

  return {
    props: {
      content,
      templateId,
      pubwiseScript:
        "https://fdyn.pubwise.io/script/2c26db5b-4c6b-428a-a959-6edc463b427f/v3/dyn/pws.js?type=ckscoop-english",
    },
  };
}) satisfies GetStaticProps<{ content: ContentStoreEntity, templateId: string, pubwiseScript: string}>;

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { platform: "cricket", language: "en", keyword: "1000" } },
    ],
    fallback: "blocking", //page will not render until getStaticProps has completed.
  };
};

function getCategories(keyword: string) {
  console.log(keyword);
  return ["news", "entertainment", "standard"] as ScheduleId[];
}

function getTemplateId(platform: string, keyword: string){
  return "daily-brief"
}

function getPathsForPlatform(){


}