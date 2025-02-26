import { reqGetSystemResource } from "@/api/auth/auth";
import { useUserInfoStore } from "@/stores/user/main";

export function getOrUpdateSystemResources(forceUpdate: boolean = false) {
  let systemResources = useUserInfoStore().getSystemResources();

  systemResources.push({
    id: 0n,
    code: "index",
    label: "首页",
    route_path: "/",
    icon_path: "HomeFilled",
    type: "menu",
    order_num: 1,
    enabled: true,
    assignable: false,
    parent_id: 0n,
    children: [],
  });

  // systemResources.push(
  //   {
  //     id: 11n,
  //     code: "dashboard",
  //     label: "数据大屏",
  //     route_path: "/dashboard",
  //     icon_path: "Histogram",
  //     type: "menu",
  //     order_num: 1,
  //     enabled: true,
  //     assignable: false,
  //     parent_id: 0n,
  //     children: [
  //       {
  //         id: 111n,
  //         code: "all",
  //         label: "汇总",
  //         route_path: "/dashboard/all",
  //         icon_path: "Grid",
  //         type: "menu",
  //         order_num: 1,
  //         enabled: true,
  //         assignable: false,
  //         parent_id: 0n,
  //         children: []
  //       }
  //     ]
  //   }
  // )

  systemResources.push({
    id: 1n,
    code: "system",
    label: "系统管理",
    route_path: "/sys-manage",
    icon_path: "Tools",
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
        route_path: "/sys-manage/user",
        icon_path: "UserFilled",
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
        route_path: "/sys-manage/role",
        icon_path: "Lock",
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
        icon_path: "Menu",
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
