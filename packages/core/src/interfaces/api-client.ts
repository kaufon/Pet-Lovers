import type { ApiResponse } from "../responses/api-response";
export interface IapiClient {
  setHeader(key: string, value: string): void
  setParam(key: string, value: string): void
  multipart<ResponseBody>(
    url: string,
    body: FormData,
  ): Promise<ApiResponse<ResponseBody>>;
  get<ResponseBody>(
    url: string,
    body?: unknown,
  ): Promise<ApiResponse<ResponseBody>>;
  post<ResponseBody>(
    url: string,
    body?: unknown,
  ): Promise<ApiResponse<ResponseBody>>;
  put<ResponseBody>(
    url: string,
    body?: unknown,
  ): Promise<ApiResponse<ResponseBody>>;
  delete<ResponseBody>(
    url: string,
    body?: unknown,
  ): Promise<ApiResponse<ResponseBody>>;
  setBaseUrl(url: string): void;
}
