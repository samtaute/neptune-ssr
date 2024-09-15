import { useState, useEffect, useRef } from "react";
import {
  createContentSeed,
  ContentStore,
} from "@/lib/page-generation/content-store";
import { PageConfig } from "@/lib/page-generation/types";
import BlockList from "./blocks/BlockList";
function LazyComponent({ pageConfig }: { pageConfig: PageConfig }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return (
    <div className="min-h-40" ref={ref}>
      {isVisible && (
        <>
          <LazyContent pageConfig={pageConfig} />
          <LazyComponent pageConfig={pageConfig} />
        </>
      )}
    </div>
  );
}

export default LazyComponent;

function LazyContent({ pageConfig }: { pageConfig: PageConfig }) {
  const [contentStore, setContentStore] = useState<ContentStore | null>(null);
  useEffect(() => {
    createContentSeed(["standard"], pageConfig.language).then((data) => {
      setContentStore(new ContentStore(data));
    });
  }, []);

  return (
    <>
      {contentStore && (
        <BlockList
          items={contentStore
            .getAll()
            .slice(
              Math.floor(contentStore.randomizer * 40),
              Math.floor(contentStore.randomizer * 40 + 10)
            )}
        />
      )}
    </>
  );
}
