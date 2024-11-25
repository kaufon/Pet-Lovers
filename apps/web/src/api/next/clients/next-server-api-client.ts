import { NextApiClient } from "./next-api-client";
import type { CacheConfig } from "../types/cache-config";

export const NextServerApiClient = (cacheConfig?: CacheConfig) => {
  const apiClient = NextApiClient(cacheConfig);
  apiClient.setBaseUrl("http://localhost:32831");
  return apiClient;
};
