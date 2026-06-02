import { extractText, resolveMediaUrl } from "../lib/content-utils";
import { fetchStrapiJson } from "../lib/strapi";

export type NavbarContent = {
  logoUrl: string | null;
  logoAlt: string;
};

type NavbarAttributes = {
  logo?: unknown;
  logoAlt?: unknown;
};

type NavbarItem = NavbarAttributes & {
  attributes?: NavbarAttributes;
};

type NavbarResponse = {
  data?: NavbarItem | null;
};

const fallbackNavbar: NavbarContent = {
  logoUrl: null,
  logoAlt: "FEMICTEC",
};

export async function getNavbarContent(): Promise<NavbarContent> {
  const endpoints = ["/api/navbar?populate=logo", "/api/navbar?populate=*"];

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<NavbarResponse>(endpoint, { data: null });
    const raw = payload.data;
    if (!raw) continue;

    const source = (raw.attributes ?? raw) as NavbarAttributes;
    return {
      logoUrl: resolveMediaUrl(source.logo),
      logoAlt: extractText(source.logoAlt) || fallbackNavbar.logoAlt,
    };
  }

  return fallbackNavbar;
}
