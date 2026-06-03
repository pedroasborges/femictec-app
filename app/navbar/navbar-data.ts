import { extractText, resolveMediaUrl } from "../lib/content-utils";
import { normalizeStrapiItem, type StrapiSingleResponse } from "../lib/strapi-normalize";
import { fetchStrapiJson } from "../lib/strapi";

export type NavbarContent = {
  logoUrl: string | null;
  logoAlt: string;
};

type NavbarAttributes = {
  logo?: unknown;
  logoAlt?: unknown;
};

type NavbarResponse = StrapiSingleResponse<NavbarAttributes>;

const fallbackNavbar: NavbarContent = {
  logoUrl: null,
  logoAlt: "FEMICTEC",
};

export async function getNavbarContent(): Promise<NavbarContent> {
  const endpoints = ["/api/navbar?populate=logo", "/api/navbar?populate=*"];

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<NavbarResponse>(endpoint, { data: null });
    const source = normalizeStrapiItem<NavbarAttributes>(payload.data);
    if (!source) continue;

    return {
      logoUrl: resolveMediaUrl(source.logo),
      logoAlt: extractText(source.logoAlt) || fallbackNavbar.logoAlt,
    };
  }

  return fallbackNavbar;
}
