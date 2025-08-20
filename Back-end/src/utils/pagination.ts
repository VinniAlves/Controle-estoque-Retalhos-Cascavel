export function toLimitOffset(page?: string, pageSize?: string) {
  const p = Math.max(1, Number(page ?? 1));
  const ps = Math.min(100, Math.max(1, Number(pageSize ?? 20)));
  const offset = (p - 1) * ps;
  return { limit: ps, offset };
}
