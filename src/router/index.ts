import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import { createRouter } from '@sa/simple-router';
import { localStg } from '@/utils/storage';
import { store } from '@/store';
import { initAuthRoute, initConstantRoute } from '@/store/slice/route';
// import { initTabStore } from '@/store/slice/tab';
import { layouts, pages } from './elegant/imports';
import { transformElegantRouteToReactRoute } from './elegant/transform';
import { afterEach, createRouteGuard } from './guard';
import { builtinRoutes } from './routes/builtin';

const { VITE_ROUTER_HISTORY_MODE = 'history', VITE_BASE_URL } = import.meta.env;

/**
 * Get auth react routes
 *
 * @param routes Elegant routes
 */
function getReactRoutes(route: ElegantConstRoute) {
  return transformElegantRouteToReactRoute(route, layouts, pages);
}

async function init() {
  await store.dispatch(initConstantRoute());
  const isLogin = Boolean(localStg.get('token'));
  if (!isLogin) {
    return;
  }
  await store.dispatch(initAuthRoute());
}

// function initBeforeRoute(allNames: string[]) {
//   store.dispatch(initTabStore(allNames));
// }

export const router = createRouter({
  initRoutes: builtinRoutes,
  mode: VITE_ROUTER_HISTORY_MODE,
  getReactRoutes,
  init,
  beforeEach: createRouteGuard,
  afterEach,
  opt: { basename: VITE_BASE_URL }
});

export async function setupRouter() {
  await router.initReady();
}
