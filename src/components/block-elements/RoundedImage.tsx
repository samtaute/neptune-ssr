import Image from "next/image";
import { PropsWithChildren } from "react";

export function RoundedImage({
  children,
  image,
  className,
  priority
}: PropsWithChildren<{ image: string; className?: string, priority?: boolean }>) {

  return (
    <div
      className={`relative flex flex-col rounded-lg bg-cover w-full overflow-hidden ${className}`}
    >
      <Image
        src={image}
        alt="top image"
        sizes="300px"
        priority={priority}
        fill
        style={{
          objectFit: "cover",
        }}
      />
        {children}
    </div>
  );
}
