import axios from "axios";

export const HttpClient = {
  async get<T>(url: string, headers: { [key: string]: string } = {}) {
    const request = axios.get<T>(url, {
      headers: {
        Connection: "close",
        ...headers,
      },
      timeout: 10000,
    });
    return request.then((response) => response.data as T);
  },
  async post<T, U>(url: string, body: U,headers: { [key: string]: string } = {}) {
    const request = axios.post<T>(url, body, {
      headers: {
        Connection: "close",
        ...headers,
      },
      timeout: 10000,
    });
    return request.then((response) => response.data as T);
  },
};
