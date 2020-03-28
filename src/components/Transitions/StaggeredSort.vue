<template>
  <transition-group :name="name" tag="g">
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: "StaggeredSort",
  props: {
    name: String
  }
};
</script>

<style scoped lang="scss">
.flip-list {
  &-move {
    transition: transform 0.5s ease-in-out;
    transition-delay: calc(0.15s * var(--i));
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 2s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
