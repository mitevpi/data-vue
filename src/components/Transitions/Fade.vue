<template>
  <transition name="fade">
    <slot />
  </transition>
</template>

<script>
export default {
  name: "Fade"
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
