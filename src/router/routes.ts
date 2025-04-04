import {
  MainContentRoutePath,
  RouteNameEnum,
  RoutePathEnum,
} from "@/router/enum";

export const constantRoutes = [
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
  {
    path: RoutePathEnum.Home,
    name: RouteNameEnum.Home,
    component: () => import("@/views/home/Home.vue"),
    redirect: MainContentRoutePath.Index,
    children: [
      {
        path: MainContentRoutePath.Index,
        name: RouteNameEnum.Index,
        component: () => import("@/views/index/Index.vue"),
      },
      {
        path: MainContentRoutePath.SystemManage,
        name: RouteNameEnum.SystemManage,
        component: () => import("@/views/sys-manage/Index.vue"),
        redirect: MainContentRoutePath.SystemManageUser,
        children: [
          {
            path: MainContentRoutePath.SystemManageUser,
            name: RouteNameEnum.SystemManageUser,
            component: () => import("@/views/sys-manage/user/User.vue"),
          },
          {
            path: MainContentRoutePath.SystemManageRole,
            name: RouteNameEnum.SystemManageRole,
            component: () => import("@/views/sys-manage/role/Role.vue"),
          },
          {
            path: MainContentRoutePath.SystemManageMenu,
            name: RouteNameEnum.SystemManageMenu,
            component: () => import("@/views/sys-manage/menu/Index.vue"),
            // redirect: MainContentRoutePath.SystemManageMenuC1,
            // children: [
            //   {
            //     path: MainContentRoutePath.SystemManageMenuC1,
            //     name: RouteNameEnum.SystemManageMenuC1,
            //     component: () => import("@/views/sys-manage/menu/MenuA.vue"),
            //   },
            //   {
            //     path: MainContentRoutePath.SystemManageMenuC2,
            //     name: RouteNameEnum.SystemManageMenuC2,
            //     component: () => import("@/views/sys-manage/menu/MenuB.vue"),
            //   },
            // ],
          },
        ],
      },
    ],
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
    // redirect: RoutePathEnum.NotFound,
    component: () => import("@/views/about/About.vue"),
  },
];

export const dynamicRoutes = [];
