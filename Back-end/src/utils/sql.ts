export function ilike(value?: string) {
  return value ? `%${value}%` : undefined;
}

export function hasText(v?: string | null) {
  return v !== undefined && v !== null && String(v).trim().length > 0;
}
