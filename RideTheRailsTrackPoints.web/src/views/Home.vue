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
    menuPosition() {
      return {
        'padding-bottom': '20%'
      }
    }
  },
});
</script>

<template>
  <ul class="menu" :style="menuPosition">
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
}

ul.menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  list-style-type: none;
}

ul.menu li {
  color: white;
  padding: 0.222rem;
}
</style>