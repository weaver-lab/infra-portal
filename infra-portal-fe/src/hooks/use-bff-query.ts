import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axios, { AxiosRequestConfig } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BFF_URL}`;

export const feToBffClient = {
  get: <T>(url: string) => axios.get(`${API_URL}${url}`) as Promise<T>,
  post: <T>(url: string, payload?: T, config?: AxiosRequestConfig) =>
    axios.post(`${API_URL}${url}`, payload, config),
  put: <T>(url: string, payload: T, config?: AxiosRequestConfig) =>
    axios.put(`${API_URL}${url}`, payload, config),
  patch: <T>(url: string, payload: T, config?: AxiosRequestConfig) =>
    axios.patch(`${API_URL}${url}`, payload, config),
  delete: (url: string) => axios.delete(`${API_URL}${url}`),
};

export const useBffQuery = <T>(
  defaultValue: unknown,
  queryKey: string[],
  url: string
): { data: T; isLoading: boolean; isError: boolean } => {
  const { data, isLoading, isError }: UseQueryResult<AxiosResponse<T>> =
    useQuery({
      queryKey,
      queryFn: () => feToBffClient.get(url),
    });
  return {
    data: data?.data || (defaultValue as T),
    isLoading,
    isError,
  };
};
