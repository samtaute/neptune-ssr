import Link from "next/link";
import { InferGetStaticPropsType } from "next";
import {
  getPaths,
  manualGetPaths,
} from "@/lib/page-generation/page-generation";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { paths } = props;
  const platforms: string[] = [];
  for (const path of paths) {
    if (!platforms.includes(path.params.platform)) {
      platforms.push(path.params.platform);
    }
  }

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-lg font-bold underline">Main Index</h1>
      <ul>
        {platforms.map((platform) => {
          const filteredPaths = paths.filter(
            (path) => path.params.platform === platform
          );
          return (
            <li key={platform}>
              {platform}:
              <ul key={Math.random()}>
                {filteredPaths.map((path) => {
                  return (
                    <li
                      className="ml-8"
                      key={`${path.params.platform}/${path.params.language}/${path.params.keyword}`}
                    >
                      <Link
                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        href={{
                          pathname: "/[platform]/[language]/[keyword]",
                          query: {
                            platform: path.params.platform,
                            language: path.params.language,
                            keyword: path.params.keyword,
                          },
                        }}
                      >{`${path.params.platform}/${path.params.language}/${path.params.keyword}`}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      // paths: await getPaths()
      paths: await manualGetPaths(),
    },
  };
}
