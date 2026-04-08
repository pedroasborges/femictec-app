import BannerCarousel, { type BannerCarouselSize, type BannerImage } from "./banner-carousel";

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://127.0.0.1:1337";

type BannerApiItem = {
  id: number;
  Imagem?: {
    url?: string;
    alternativeText?: string | null;
  };
  attributes?: {
    Imagem?: {
      data?: {
        attributes?: {
          url?: string;
          alternativeText?: string | null;
        };
      } | null;
    };
  };
};

async function getBanner() {
  const res = await fetch(`${STRAPI_BASE_URL}/api/banners?populate=*`, { cache: "no-store" });
  if (!res.ok) return { data: [] as BannerApiItem[] };
  return res.json();
}

function normalizeBannerImages(items: BannerApiItem[]): BannerImage[] {
  return items
    .map((item) => {
      const imageUrl = item.Imagem?.url ?? item.attributes?.Imagem?.data?.attributes?.url;
      const altText =
        item.Imagem?.alternativeText ??
        item.attributes?.Imagem?.data?.attributes?.alternativeText ??
        "Banner FEMICTEC";

      if (!imageUrl) return null;

      const src = imageUrl.startsWith("http") ? imageUrl : `${STRAPI_BASE_URL}${imageUrl}`;

      return {
        id: item.id,
        src,
        alt: altText,
      };
    })
    .filter((item): item is BannerImage => item !== null);
}

type BannerProps = {
  size?: BannerCarouselSize;
};

export default async function Banner({ size = "default" }: BannerProps) {
  const responseBanner = await getBanner();
  const images = normalizeBannerImages(responseBanner.data ?? []);

  if (images.length === 0) {
    return null;
  }

  return <BannerCarousel images={images} size={size} />;
}
