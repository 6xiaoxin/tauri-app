export interface ApiResponse<TData> {
  code: number
  data: TData
  message: string
}

export interface ApiErrorPayload {
  code: number | null
  message: string
  status: number | null
}
