<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
    };
  },
  components: {
  },
  setup() { },
  methods: {

  },
  computed: {

  },
});
</script>

<template>
  <ul class="menu">
    <li>PLAY</li>
    <li>STATISTICS</li>
    <li>OPTIONS</li>
    <li>CREDITS</li>
  </ul>

</template>

<style>
body {
  background-image: url("../assets/topScreen.jpeg");
  background-repeat: no-repeat;
  background-size: cover 150%;
  background-position: center top;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

ul.menu {
  display: flex;
  flex-direction: column;
  list-style-type: none;
}
</style>