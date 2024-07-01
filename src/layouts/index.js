function setupLayoutsRecursive(routes, isBase) {
  return routes.map((route) => {
    if (route.children?.length > 0) {
      route.children = setupLayoutsRecursive(route.children, false);
    }

    const layout = route.meta?.layout;
    if (layout || isBase) {
      return {
        path: route.path,
        component: layout ?? (() => import('@/layouts/default/Index.vue')),
        children: [{ ...route, path: '' }],
      };
    }
    return route;
  });
}

export function setupLayouts(routes) {
  return setupLayoutsRecursive(routes, true);
}
