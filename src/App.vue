<template>
  <Component :is="$route.meta.layout ?? 'div'">
    <RouterView />
  </Component>
</template>
