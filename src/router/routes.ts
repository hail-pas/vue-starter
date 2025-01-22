import { RouteNameEnum, RoutePathEnum } from "@/router/enum"


export const constantRoutes = [
    {
        path: RoutePathEnum.Home,
        name: RouteNameEnum.Home,
        component: () => import("@/views/home/Home.vue"),
    },
    {
        path: RoutePathEnum.Login,
        name: RouteNameEnum.Login,
        component: () => import("@/views/entry/Login.vue"),
    },
    {
        path: RoutePathEnum.Register,
        name: RouteNameEnum.Register,
        component: () => import("@/views/entry/Register.vue"),
    },
    {
        path: RoutePathEnum.ForgotPassword,
        name: RouteNameEnum.ForgotPassword,
        component: () => import("@/views/entry/ForgotPassword.vue"),
    },

    // error pages
    {
        path: RoutePathEnum.NotFound,
        name: RouteNameEnum.NotFound,
        component: () => import("@/views/error/NotFound.vue"),
    },
    {
        path: RoutePathEnum.Forbidden,
        name: RouteNameEnum.Forbidden,
        component: () => import("@/views/error/Forbidden.vue"),
    },
    {
        path: RoutePathEnum.ServerError,
        name: RouteNameEnum.ServerError,
        component: () => import("@/views/error/ServerError.vue"),
    },
    {
        path: RoutePathEnum.Maintained,
        name: RouteNameEnum.Maintained,
        component: () => import("@/views/error/Maintained.vue"),
    },
    // other pages
    {
        path: RoutePathEnum.About,
        name: RouteNameEnum.About,
        component: () => import("@/views/about/About.vue"),
    },
    {
        path: RoutePathEnum.NotMatched,
        name: RouteNameEnum.NotMatched,
        redirect: RoutePathEnum.NotFound
    }
]



export const dynamicRoutes = [

]
