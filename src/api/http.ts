import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios'

import type { ApiErrorPayload } from '@/types/api'
import { getApiBaseUrl } from '@/utils/env'

export class ApiError extends Error {
  public readonly code: number | null
  public readonly status: number | null

  public constructor(payload: ApiErrorPayload) {
    super(payload.message)
    this.name = 'ApiError'
    this.code = payload.code
    this.status = payload.status
  }
}

function createHttpClient(): AxiosInstance {
  const client = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 15_000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
  )

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  )

  return client
}

function normalizeApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    return new ApiError({
      code: null,
      message: error.message || '网络请求失败',
      status: error.response?.status ?? null,
    })
  }

  return new ApiError({
    code: null,
    message: error instanceof Error ? error.message : '未知网络错误',
    status: null,
  })
}

export const http = createHttpClient()

export async function request<TResponse>(config: AxiosRequestConfig): Promise<TResponse> {
  const response = await http.request<TResponse>(config)
  return response.data
}
