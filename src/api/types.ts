export interface Response<T> {
  data: T;
  message: string | null;
  code: number;
  response_time: string;
  trace_id: string;
}
