import type { SimpleIcon } from "simple-icons";
import {
  siAudi,
  siBmw,
  siChevrolet,
  siFord,
  siHonda,
  siLamborghini,
  siPorsche,
  siTesla,
  siToyota,
} from "simple-icons";

export type BrandEmblem =
  | { kind: "simple"; path: string; hex: string }
  | { kind: "file"; src: string };

/** Only slugs mapped here resolve to recognizable marks; generic pages use Lucide fallback. */
const SIMPLE: Record<string, SimpleIcon> = {
  audi: siAudi,
  bmw: siBmw,
  chevrolet: siChevrolet,
  ford: siFord,
  honda: siHonda,
  lamborghini: siLamborghini,
  porsche: siPorsche,
  tesla: siTesla,
  toyota: siToyota,
};

const FILE_EMBLEM: Record<string, string> = {
  "mercedes-benz": "/emblems/mercedes-benz.svg",
  "harley-davidson": "/emblems/harley-davidson.svg",
};

export function getBrandEmblemForSlug(slug: string): BrandEmblem | null {
  const simple = SIMPLE[slug];
  if (simple) {
    return { kind: "simple", path: simple.path, hex: simple.hex };
  }
  const file = FILE_EMBLEM[slug];
  if (file) {
    return { kind: "file", src: file };
  }
  return null;
}
