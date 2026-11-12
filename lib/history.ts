/**
 * Requests protection from automatic browser storage eviction.
 * Returns null when the browser does not support the Storage API.
 */
export async function requestPersistentHistoryStorage(): Promise<boolean | null> {
  if (typeof navigator === "undefined" || !navigator.storage?.persist) return null;
  if (await navigator.storage.persisted()) return true;
  return navigator.storage.persist();
}
