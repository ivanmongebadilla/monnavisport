/**
 * Configurable base URL used to build shareable/public links (e.g. player QR
 * codes). Never hardcode the production domain outside this file.
 */
export const SITE_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://monnavitech.dev",
  productName: "MONNAVI SPORTS",
  parentCompany: "MONNAVI",
};

export function getAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.baseUrl}${normalizedPath}`;
}

export function getPlayerProfileUrl(slug: string): string {
  return getAbsoluteUrl(`/players/${slug}`);
}
