// Based on https://github.com/antfu/vue-router-better-scroller

import { nextTick } from 'vue';

export function setupRouterScroller(router, selectors) {
  if (router.options.scrollBehavior) {
    console.warn(
      '`scrollBehavior` options in Vue Router is overwritten by `vue-router-scroller` plugin, you can remove it from createRouter()',
    );
  }

  router.options.scrollBehavior = () => {};

  window.addEventListener('beforeunload', () => {
    capturePositions(selectors);
  });

  router.beforeResolve((to, from) => {
    if (history.state?.current === to.fullPath) {
      return;
    }
    capturePositions(selectors);
  });

  router.afterEach(async (to, from, failure) => {
    if (failure) {
      return;
    }
    const positions = history.state.positions;
    await nextTick();
    restorePositions(selectors, positions);
  });
}

export function createRouterScroller(selectors) {
  return {
    install(app) {
      const router = app.config.globalProperties.$router;
      if (router == null) {
        throw new Error(
          'Router instance is not found on this Vue app. This plugin should be installed after Vue Router.',
        );
      }
      setupRouterScroller(router, selectors);
    },
  };
}

function querySelectorAll(selector) {
  if (selector === 'window') {
    return [window];
  }
  if (selector === 'body') {
    return [document.body];
  }
  return document.querySelectorAll(selector);
}

function capturePositions(selectors) {
  const positions = {};
  for (const selector of selectors) {
    const elements = querySelectorAll(selector);
    positions[selector] = [...elements].map((element) =>
      element instanceof Window
        ? { top: window.scrollY, left: window.scrollX }
        : { top: element.scrollTop, left: element.scrollLeft },
    );
  }
  history.replaceState({ ...history.state, positions }, '');
}

function restorePositions(selectors, positions) {
  for (const selector of selectors) {
    const elements = querySelectorAll(selector);
    for (const [i, element] of elements.entries()) {
      const position = positions?.[selector]?.[i];
      if (position != null) {
        element.scrollTo(position);
      }
    }
  }
}
