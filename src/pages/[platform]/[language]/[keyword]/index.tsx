import {PropsWithChildren } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createContentStore} from "@/lib/softbox-api/actions";
import {
  ContentStoreEntity,
  ScheduleId,
} from "@/lib/softbox-api/types";
import TemplateDailyBrief from "@/components/templates/TemplateDailyBrief";
import Script from "next/script";
import { getPaths } from "@/lib/page-generation/page-generation";

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

//Layout Block
function FeedContainer({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-[450px] min-h-40 flex flex-col">
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

  //get props
  const content = await createContentStore(categories, language); 
  const templateId = getTemplateId(platform, keyword); 
  const pubwiseScript = getPubwiseScript()

  return {
    props: {
      content,
      templateId,
      pubwiseScript
    },
    revalidate: 1800
  };
}) satisfies GetStaticProps<{ content: ContentStoreEntity, templateId: string, pubwiseScript: string}>;

export const getStaticPaths = async () => {
  return {
    paths: await getPaths(), 
    fallback: "blocking", //page will not render until getStaticProps has completed.
  };
};

///Helper functions
function getTemplateId(platform: string, keyword: string){
  return "daily-brief"
}


function getTemplate(id: string, content: ContentStoreEntity){
  if(id === 'daily-brief'){
    return <TemplateDailyBrief content={content}></TemplateDailyBrief>
  }
}

function getCategories(keyword: string) {
  console.log(keyword);
  return ["news", "entertainment", "standard"] as ScheduleId[];
}


function getPubwiseScript(){
  //todo: implement logic

  return "https://fdyn.pubwise.io/script/2c26db5b-4c6b-428a-a959-6edc463b427f/v3/dyn/pws.js?type=ckscoop-english"

}




