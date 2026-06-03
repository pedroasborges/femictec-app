import { extractText } from "./content-utils";
import { fetchStrapiJson } from "./strapi";
import { normalizeStrapiItem, type StrapiSingleResponse } from "./strapi-normalize";

export type FooterContent = {
  Email: string | null;
  Telefone: string | null;
  Instagram: string | null;
  Facebook: string | null;
  Youtube: string | null;
};

type FooterAttributes = {
  Email?: unknown;
  Telefone?: unknown;
  Instagram?: unknown;
  Facebook?: unknown;
  Youtube?: unknown;
  facebook?: unknown;
  youtube?: unknown;
};

type FooterResponse = StrapiSingleResponse<FooterAttributes>;

const fallbackFooter: FooterContent = {
  Email: "femictec@novohamburgo.rs.gov.br",
  Telefone: "(51) 0000-0000",
  Instagram: null,
  Facebook: null,
  Youtube: null,
};

// O rodape e a pagina de contato usam o mesmo conteudo global do Strapi.
// Centralizar esta leitura evita duplicacao e reduz a chance de um componente
// ficar diferente do outro quando o schema do Strapi mudar.
export async function getFooterContent(): Promise<FooterContent> {
  const response = await fetchStrapiJson<FooterResponse>("/api/footer", { data: null });
  const source = normalizeStrapiItem<FooterAttributes>(response.data) ?? {};

  return {
    Email: extractText(source.Email) || fallbackFooter.Email,
    Telefone: extractText(source.Telefone) || fallbackFooter.Telefone,
    Instagram: extractText(source.Instagram) || fallbackFooter.Instagram,
    Facebook: extractText(source.Facebook) || extractText(source.facebook) || fallbackFooter.Facebook,
    Youtube: extractText(source.Youtube) || extractText(source.youtube) || fallbackFooter.Youtube,
  };
}
