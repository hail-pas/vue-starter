import { reqGetSystemResource } from "@/api/auth/auth";
import type { SystemResource } from "@/api/auth/types";
import { useUserInfoStore } from "@/stores/user/main";

const MOCK_MENUS = [
  {
    id: 0n,
    code: "index",
    label: "首页",
    route_path: "/index",
    icon_path: "HomeFilled",
    type: "menu",
    order_num: 1,
    enabled: true,
    assignable: false,
    parent_id: 0n,
    children: [],
  },
  // {
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
  //   },

  {
    id: 1n,
    code: "systemManage",
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
        code: "SystemManageUser",
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
        code: "SystemManageRole",
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
        code: "SystemManageMenu",
        label: "菜单管理",
        route_path: "/sys-manage/menu",
        icon_path: "Menu",
        type: "menu",
        order_num: 4,
        enabled: true,
        assignable: false,
        parent_id: 0n,
        children: [
          {
            id: 5n,
            code: "SystemManageMenuC1",
            label: "菜单管理1",
            route_path: "/sys-manage/menu/c1",
            icon_path: "Lock",
            type: "menu",
            order_num: 3,
            enabled: true,

            assignable: false,
            parent_id: 0n,
            children: [],
          },
          {
            id: 6n,
            code: "SystemManageMenuC2",
            label: "菜单管理2",
            route_path: "/sys-manage/menu/c2",
            icon_path: "Menu",
            type: "menu",
            order_num: 4,
            enabled: true,
            assignable: false,
            parent_id: 0n,
            children: [],
          },
        ],
      },
    ],
  },
];

export function getOrUpdateSystemResources(
  forceUpdate: boolean = false,
): Array<SystemResource> {
  let systemResources = useUserInfoStore().getSystemResources();

  if (systemResources.length > 0) {
    return systemResources;
  }

  MOCK_MENUS.forEach((element) => {
    systemResources.push(element);
  });

  useUserInfoStore().setSystemResources(systemResources);

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
