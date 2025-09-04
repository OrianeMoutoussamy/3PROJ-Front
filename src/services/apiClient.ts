import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = "http://localhost:8080") {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  private handleResponse<T>(res: AxiosResponse<T>): T {
    if (res.status === 204 || res.data === "" || res.data === undefined) {
      // @ts-expect-error: force pour gérer void
      return undefined;
    }
    return res.data;
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get<T>(url, config).then(this.handleResponse);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post<T>(url, data, config).then(this.handleResponse);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put<T>(url, data, config).then(this.handleResponse);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete<T>(url, config).then(this.handleResponse);
  }
}

export const apiClient = new ApiClient();
