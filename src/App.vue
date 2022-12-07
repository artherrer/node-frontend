<template>
  <router-view></router-view>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const isAuthenticated = store.getters.isAuthenticated;

    return {
      isAuthenticated,
    };
  },
};
</script>
