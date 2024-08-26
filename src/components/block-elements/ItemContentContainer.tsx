import { PropsWithChildren } from "react";

function ItemContentContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-2 self-stretch items-start pt-2 pb-5">
      {children}
    </div>
  );
}

export default ItemContentContainer;
