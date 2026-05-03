export type RichImage = {
  src: string;
  alt: string;
};

export type RichSection = {
  title: string;
  body: string;
  image?: RichImage;
};

export type StatChip = {
  label: string;
  value: string;
};
