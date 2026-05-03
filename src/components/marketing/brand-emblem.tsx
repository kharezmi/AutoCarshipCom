import Image from "next/image";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrandEmblem } from "@/lib/vehicle-brand-emblem";

export function BrandEmblemMark({
  emblem,
  className,
  size = "md",
  label,
  surface = "dark",
}: {
  emblem: BrandEmblem | null;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  label: string;
  /** Catalog cards sit on white; heroes use dark. */
  surface?: "dark" | "light";
}) {
  const box =
    size === "xl"
      ? "h-[8.5rem] w-[8.5rem] md:h-40 md:w-40"
      : size === "lg"
        ? "h-24 w-24"
        : size === "sm"
          ? "h-14 w-14"
          : "h-20 w-20";

  const carGlyph =
    size === "xl"
      ? "h-16 w-16 md:h-[4.25rem] md:w-[4.25rem]"
      : size === "lg"
        ? "h-12 w-12"
        : size === "sm"
          ? "h-9 w-9"
          : "h-11 w-11";

  if (!emblem) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-2xl border",
          surface === "dark"
            ? "border-white/25 bg-white/10 text-white"
            : "border-slate-200 bg-white text-navy-800 shadow-sm",
          box,
          className
        )}
      >
        <Car className={cn(carGlyph, "opacity-90")} aria-hidden />
        <span className="sr-only">{label} placeholder mark</span>
      </div>
    );
  }

  if (emblem.kind === "file") {
    return (
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-white p-5 shadow-xl",
          surface === "dark" ? "border-white/20" : "border-slate-200",
          box,
          className
        )}
      >
        <Image
          src={emblem.src}
          alt=""
          width={320}
          height={320}
          className={cn(
            size === "xl" ? "max-h-[5.75rem]" : "",
            size === "lg" ? "max-h-14" : "",
            size === "md" ? "max-h-12" : "",
            size === "sm" ? "max-h-10" : "",
            "max-w-full object-contain"
          )}
          unoptimized={emblem.src.endsWith(".svg")}
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${label} emblem`}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl border bg-white p-6 shadow-xl",
        surface === "dark" ? "border-white/20" : "border-slate-200",
        box,
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn(
          size === "xl" ? "h-[5.75rem] w-[5.75rem]" : "",
          size === "lg" ? "h-14 w-14" : "",
          size === "md" ? "h-12 w-12" : "",
          size === "sm" ? "h-10 w-10" : ""
        )}
      >
        <path d={emblem.path} fill={`#${emblem.hex}`} />
      </svg>
    </div>
  );
}
