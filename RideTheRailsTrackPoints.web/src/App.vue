<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      navbarOpened: false,
    };
  },
  setup() { },
  methods: {},
  computed: {},
});
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style v-if="true">
* {
  background-color: '#fff';
}
</style>
<style v-else>

</style>

<style scoped>

</style>
