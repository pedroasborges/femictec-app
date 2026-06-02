function toBoolean(value: string | undefined): boolean {
  if (!value) return false;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

export function isSiteUnavailable(): boolean {
  return toBoolean(process.env.SITE_MAINTENANCE_MODE) || toBoolean(process.env.NEXT_PUBLIC_SITE_MAINTENANCE_MODE);
}
