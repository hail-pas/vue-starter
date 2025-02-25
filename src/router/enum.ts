export enum RouteNameEnum {
  Home = "Home",
  Login = "Login",
  Register = "Register",
  ForgotPassword = "ForgotPassword",
  NotFound = "NotFound",
  Forbidden = "Forbidden",
  ServerError = "ServerError",
  Maintained = "Maintained",
  About = "About",
  NotMatched = "NotMatched",

  // 系统管理
  SystemManage = "SystemManage",
  SystemManageUser = "SystemManageUser",
  SystemManageRole = "SystemManageRole",
}

export enum RoutePathEnum {
  Home = "/",
  Login = "/login",
  Register = "/register",
  ForgotPassword = "/forgot-password",
  About = "/about",

  // 系统管理
  SystemManage = "/sys-manage",
  SystemManageUser = "/sys-manage/user",
  SystemManageRole = "/sys-manage/role",

  // error pages
  NotFound = "/error/not-found",
  Forbidden = "/error/forbidden",
  ServerError = "/error/server-error",
  Maintained = "/error/maintained",

  // wildcard route
  NotMatched = "/:pathMatch(.*)*",
}
