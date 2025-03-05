import nprogress from "nprogress";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalizedGeneric,
} from "vue-router";
import { constantRoutes } from "@/router/routes";
import { useUserInfoStore } from "@/stores/user/main";
import { storeInstance } from "@/stores/main";

import "nprogress/nprogress.css";
import { AllPath, LoginRequiredPath, RoutePathEnum } from "@/router/enum";

nprogress.configure({ showSpinner: false });

const useUserInfo = useUserInfoStore(storeInstance);

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;

// 路由全局前置守卫

router.beforeEach(
  (
    to: RouteLocationNormalizedGeneric,
    _from: RouteLocationNormalizedGeneric,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    next: Function,
  ) => {
    // 进度条
    if (!AllPath.includes(to.path)) {
      next({ path: RoutePathEnum.NotFound });
      return;
    }

    nprogress.start();
    if (useUserInfo.getToken()) {
      // 已登录的情况
      if (to.path === RoutePathEnum.Login) {
        next({ path: RoutePathEnum.Home });
        return;
      }
      next();
    } else {
      if (LoginRequiredPath.includes(to.path)) {
        next({ path: RoutePathEnum.Login, query: { redirect: to.path } });
        return;
      }
      next();
    }
  },
);

// 路由全局后置守卫
router.afterEach(() => {
  // 进度条
  nprogress.done();
});
