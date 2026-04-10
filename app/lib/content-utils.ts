import { toStrapiUrl } from "./strapi";

export function extractText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        if (!item || typeof item !== "object") return "";

        const record = item as { text?: unknown; children?: unknown };
        if (typeof record.text === "string") return record.text;

        if (Array.isArray(record.children)) {
          return record.children
            .map((child) => {
              if (!child || typeof child !== "object") return "";
              const text = (child as { text?: unknown }).text;
              return typeof text === "string" ? text : "";
            })
            .join(" ");
        }

        return "";
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  return "";
}

function findFirstUrl(value: unknown): string | null {
  if (!value) return null;

  if (typeof value === "string") {
    if (value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://") || value.startsWith("//")) {
      return value;
    }
    return null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const nested = findFirstUrl(item);
      if (nested) return nested;
    }
    return null;
  }

  if (typeof value !== "object") return null;

  const objectValue = value as Record<string, unknown>;
  if (typeof objectValue.url === "string") return objectValue.url;

  const priorityKeys = ["data", "attributes", "formats", "large", "medium", "small", "thumbnail"];
  for (const key of priorityKeys) {
    const nested = findFirstUrl(objectValue[key]);
    if (nested) return nested;
  }

  for (const nested of Object.values(objectValue)) {
    const resolved = findFirstUrl(nested);
    if (resolved) return resolved;
  }

  return null;
}

export function resolveMediaUrl(value: unknown): string | null {
  const rawUrl = findFirstUrl(value);
  if (!rawUrl) return null;

  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) return rawUrl;
  if (rawUrl.startsWith("//")) return `https:${rawUrl}`;
  return toStrapiUrl(rawUrl);
}

export function formatDateTimePtBr(value: unknown, fallback = "Data e horario a definir"): string {
  const textValue = extractText(value);
  if (!textValue) return fallback;

  const parsedDate = new Date(textValue);
  if (Number.isNaN(parsedDate.getTime())) return textValue;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(parsedDate);
}

