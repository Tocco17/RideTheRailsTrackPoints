<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      navbarOpened: false,
    };
  },
  setup() {},
  methods: {},
  computed: {},
});
</script>

<template>
  <div class="router-page">
    <router-view />
  </div>
</template>

<style>
* {
  height: 100%;
}

body {
  background-color: "#000";
}

.router-page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 45%;
}
</style>
