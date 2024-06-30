function setupLayoutsRecursive(routes, isBase) {
  return routes.map((route) => {
    if (route.children?.length > 0) {
      route.children = setupLayoutsRecursive(route.children, false);
    }

    let layout = route.meta?.layout;
    if (layout == null && isBase) {
      layout = () => import('@/layouts/default/Index.vue');
    }

    if (layout) {
      return {
        path: route.path,
        component: layout,
        children: [{ ...route, path: '' }],
      };
    }

    return route;
  });
}

export function setupLayouts(routes) {
  return setupLayoutsRecursive(routes, true);
}
