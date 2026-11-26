import Image from "next/image";
import type { ImageAsset } from "@/types/content";

type FrameProps = {
  image: ImageAsset;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function Frame({
  image,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 45vw, 100vw",
}: FrameProps) {
  return (
    <span className={className ? `frame ${className}` : "frame"}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        decoding="async"
        {...(priority ? {} : { loading: "lazy" as const })}
      />
    </span>
  );
}
