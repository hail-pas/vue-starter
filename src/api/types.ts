interface BaseResponse {
  message: string | null;
  code: number;
  response_time: string;
  trace_id: string;
}

export interface Response<T> extends BaseResponse {
  data: T | null;
}

interface PageInfo {
  total_page: number;
  total_count: number;
  size: number;
  page: number;
}

interface PageData<T> {
  records: T[];
  page_info: PageInfo;
}

export interface PageResponse<T> extends BaseResponse {
  data: PageData<T> | null;
}

export interface PageFilterSchema {
  page: number;
  size: number;
}
