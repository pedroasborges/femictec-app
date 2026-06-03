type StrapiRecord = Record<string, unknown>;

// O Strapi pode devolver um item como `data`, `data.attributes` ou uma lista.
// Estes helpers normalizam essas variacoes para um formato previsivel no frontend.
export function isRecord(value: unknown): value is StrapiRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export type StrapiAttributes<T extends StrapiRecord> = T & {
  attributes?: T;
};

export type StrapiSingleResponse<T extends StrapiRecord> = {
  data?: StrapiAttributes<T> | null;
};

export type StrapiListResponse<T extends StrapiRecord> = {
  data?: Array<StrapiAttributes<T>> | StrapiAttributes<T> | null;
};

export function normalizeStrapiItem<T extends StrapiRecord>(value: unknown): T | null {
  const record = isRecord(value) ? value : null;
  if (!record) return null;

  const attributes = isRecord(record.attributes) ? record.attributes : null;
  return (attributes ? { ...record, ...attributes } : record) as T;
}

export function normalizeStrapiRoot<T extends StrapiRecord>(payload: unknown): T | null {
  const record = isRecord(payload) ? payload : null;
  if (!record) return null;

  if ("data" in record) {
    return normalizeStrapiItem<T>(record.data);
  }

  return normalizeStrapiItem<T>(record);
}

export function normalizeStrapiList<T extends StrapiRecord>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeStrapiItem<T>(item)).filter((item): item is T => item !== null);
  }

  const record = isRecord(value) ? value : null;
  if (!record) return [];

  if (Array.isArray(record.data)) {
    return record.data.map((item) => normalizeStrapiItem<T>(item)).filter((item): item is T => item !== null);
  }

  // Alguns endpoints do Strapi devolvem um item unico ja desembrulhado em `data`.
  // Outros devolvem a propria entidade diretamente. Aceitamos os dois formatos
  // para evitar que telas caiam para fallback quando a API responder 200.
  const single = "data" in record ? normalizeStrapiItem<T>(record.data) : normalizeStrapiItem<T>(record);
  return single ? [single] : [];
}

export function pickStrapiSection<T extends StrapiRecord>(source: StrapiRecord, keys: string[]): T {
  for (const key of keys) {
    const section = normalizeStrapiItem<T>(source[key]);
    if (section) return section;
  }

  return source as T;
}
