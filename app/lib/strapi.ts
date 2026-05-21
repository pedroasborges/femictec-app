export const STRAPI_BASE_URL = /*process.env.NEXT_PUBLIC_STRAPI_URL ??*/ "http://127.0.0.1:1337" /*http://cms-femictec.novohamburgo.rs.gov.br*/;

export function toStrapiUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${STRAPI_BASE_URL}${normalizedPath}`;
}

export async function fetchStrapiJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(toStrapiUrl(path), { cache: "no-store" });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}
