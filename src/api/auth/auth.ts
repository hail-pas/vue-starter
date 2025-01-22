import request from "@/common/request";
import { type Response, type LoginResponse, type LoginSchema } from "@/api/types";


enum API {
    LOGIN="/login",
    REGISTER="/register",
    LOGOUT="/logout",
    RESET_PASSWORD="/reset-password",
    CHANGE_PASSWORD="/change-password",
    FORGET_PASSWORD="/forget-password",
}

export const login = (data: LoginSchema) => request.post<Response<LoginResponse>>(API.LOGIN, data, {withCredentials: true});

