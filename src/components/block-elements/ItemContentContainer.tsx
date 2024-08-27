import { PropsWithChildren } from "react";

function ItemContentContainer({ children, className }: PropsWithChildren<{className: string}>) {
  return (
    <div className={`flex flex-col gap-2 self-stretch items-start pt-2 pb-5 ${className}`}>
      {children}
    </div>
  );
}

export default ItemContentContainer;
