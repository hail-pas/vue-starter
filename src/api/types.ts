export interface Response<T> {
  data: T;
  message: string | null;
  code: number;
  response_time: string;
  trace_id: string;
}


export interface LoginSchema {
  phone: string;
  password: string;
}


export interface RegisterSchema {
  phone: string;
  password: string;
  name: string;
}

export interface AccountInfo {
  id: number;
  phone: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  token: string;
  account: AccountInfo;
}
