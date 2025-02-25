import { reqGetSystemResource } from "@/api/auth/auth";
import { useUserInfoStore } from "@/stores/user/main";

export function getOrUpdateSystemResources(forceUpdate: boolean = false) {
  let systemResources = useUserInfoStore().getSystemResources();

  systemResources.push({
    id: 1n,
    code: "system",
    label: "系统管理",
    route_path: "/sys-manage",
    icon_path: "el-icon-setting",
    type: "menu",
    order_num: 1,
    enabled: true,
    assignable: false,
    parent_id: 0n,
    children: [
      {
        id: 2n,
        code: "user",
        label: "用户管理",
        route_path: "/user-manage/user",
        icon_path: "el-icon-user",
        type: "menu",
        order_num: 2,
        enabled: true,
        assignable: false,
        parent_id: 0n,
        children: [],
      },
      {
        id: 3n,
        code: "role",
        label: "角色管理",
        route_path: "/user-manage/role",
        icon_path: "el-icon-s-custom",
        type: "menu",
        order_num: 3,
        enabled: true,
        assignable: false,
        parent_id: 0n,
        children: [],
      },
      {
        id: 4n,
        code: "menu",
        label: "菜单管理",
        route_path: "/user-manage/menu",
        icon_path: "el-icon-menu",
        type: "menu",
        order_num: 4,
        enabled: true,
        assignable: false,
        parent_id: 0n,
        children: [],
      },
    ],
  });

  return systemResources;

  if (!forceUpdate && systemResources && systemResources.length > 0) {
    return systemResources;
  }

  reqGetSystemResource().then((res) => {
    if (res.data.length > 0) {
      useUserInfoStore().setSystemResources(res.data);
      systemResources = res.data;
    }
  });
  return systemResources;
}
