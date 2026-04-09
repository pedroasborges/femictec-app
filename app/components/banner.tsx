import BannerCarousel, { type BannerCarouselSize, type BannerImage } from "./banner-carousel";
import { fetchStrapiJson } from "../lib/strapi";
import { resolveMediaUrl } from "../lib/content-utils";

type BannerApiItem = {
  id: number;
  Imagem?: unknown;
  attributes?: {
    Imagem?: unknown;
  };
};

async function getBanner() {
  return fetchStrapiJson<{ data: BannerApiItem[] }>("/api/banners?populate=*", { data: [] as BannerApiItem[] });
}

function normalizeBannerImages(items: BannerApiItem[]): BannerImage[] {
  return items
    .map((item) => {
      const media = item.Imagem ?? item.attributes?.Imagem;
      const src = resolveMediaUrl(media);

      if (!src) return null;

      return {
        id: item.id,
        src,
        alt: "Banner FEMICTEC",
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

