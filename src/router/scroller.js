// Based on https://github.com/antfu/vue-router-better-scroller

import { nextTick } from 'vue';
import { isNavigationFailure } from 'vue-router';

export function setupRouterScroller(router, selectors) {
  if (router.options.scrollBehavior) {
    console.warn(
      '`scrollBehavior` options in Vue Router is overwritten by `vue-router-scroller` plugin, you can remove it from createRouter()',
    );
  }

  router.options.scrollBehavior = () => {};

  router.beforeResolve((to, from) => {
    if (history.state?.current === to.fullPath) {
      return;
    }

    const positions = capturePositions(selectors);
    history.replaceState({ ...history.state, vueRouterPositions: positions }, '');
  });

  router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
      return;
    }

    const positions = history.state.vueRouterPositions;
    nextTick(() => {
      applyPositions(positions, selectors);
    });
  });
}

export function createRouterScroller(options) {
  return {
    install(app) {
      const router = app.config.globalProperties.$router;
      if (router == null) {
        throw new Error(
          'Router instance is not found on this Vue app. This plugin should be installed after Vue Router.',
        );
      }
      setupRouterScroller(router, options);
    },
  };
}

function capturePositions(selectors) {
  const positions = {};
  for (const selector of selectors) {
    const elements = querySelectorAll(selector);
    positions[selector] = [...elements].map((element) => getScrollPosition(element));
  }
  return positions;
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

function getScrollPosition(element) {
  return element instanceof Window
    ? { left: window.scrollX, top: window.scrollY }
    : { left: element.scrollLeft, top: element.scrollTop };
}

function applyPositions(positions, selectors) {
  for (const selector of selectors) {
    const elements = querySelectorAll(selector);
    for (const [i, element] of elements.entries()) {
      const position = positions?.[selector]?.[i];
      element.scrollTo(position ?? { top: 0, left: 0 });
    }
  }
}
