import BannerCarousel, { type BannerCarouselSize, type BannerImage } from "./banner-carousel";
import { resolveMediaUrl } from "../lib/content-utils";
import { fetchStrapiJson } from "../lib/strapi";
import { normalizeStrapiItem } from "../lib/strapi-normalize";

type BannerApiItem = {
  id: number;
  Imagem?: unknown;
  imagem?: unknown;
  attributes?: {
    Imagem?: unknown;
    imagem?: unknown;
  };
};

async function getBanner() {
  return fetchStrapiJson<{ data: BannerApiItem[] }>("/api/banners?populate=*", { data: [] as BannerApiItem[] });
}

function normalizeBannerImages(items: BannerApiItem[]): BannerImage[] {
  // O Strapi pode devolver o media no item direto ou dentro de `attributes`.
  // Normalizando antes de ler a imagem, o carrossel fica resiliente a ambos os formatos.
  return items
    .map((item) => normalizeStrapiItem<BannerApiItem>(item))
    .filter((item): item is BannerApiItem => item !== null)
    .map((item) => {
      const media = item.Imagem ?? item.imagem ?? item.attributes?.Imagem ?? item.attributes?.imagem;
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
