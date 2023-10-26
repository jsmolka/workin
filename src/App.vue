<template>
  <component :is="$route.meta.layout ?? 'div'">
    <RouterView />
  </component>
</template>
