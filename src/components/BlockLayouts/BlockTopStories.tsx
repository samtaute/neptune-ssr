import ViewabilityWrapper from "../common/ViewabilityWrapper"
import { BlockProps } from "../../types/propsTypes"

function BlockTopStories({items}: BlockProps){

   
  return (
    <>
      {items.map((item) => {
        return (
          <ViewabilityWrapper key={item.uid} itemData={item}>
            <div>BlockTopStories</div>
          </ViewabilityWrapper>
        );
      })}
    </>
  );

}

export default BlockTopStories