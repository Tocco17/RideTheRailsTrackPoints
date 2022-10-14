<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const firstVoice = document.querySelector('li[data-index="1"]');
    const position = this.getPosition(firstVoice);
    return {
      iconX: position.x + "px",
      iconY: position.y + "px",
      iconSpace: position.space + "px",
    };
  },
  components: {},
  setup() {},
  methods: {
    mouseEnterVoiceMenu(indexVoice) {
      let voice = document.querySelector(`li[data-index='${indexVoice}']`);
      voice.classList.add("mouseHover");
      this.changeIconPosition(voice);
    },
    mouseLeaveVoiceMenu(indexVoice) {
      let voice = document.querySelector(`li[data-index='${indexVoice}']`);
      voice.classList.remove("mouseHover");
    },
    getPosition(voice) {
      if (!voice)
        console.log(
          "Voice undefined, cannot calculate position. Position set to default"
        );

      const position = voice
        ? voice.getBoundingClientRect()
        : { x: -100, y: -100 };

      const space = voice ? voice.clientWidth : 0;
      const pageWidth = window.innerWidth;

      const x = (pageWidth + space) / 2;
      const y = position.y;

      return { x, y, space };
    },
    changeIconPosition(voice) {
      const position = this.getPosition(voice);
      this.iconX = position.x + "px";
      this.iconY = position.y + "px";
      this.iconSpace = position.space + "px";

      console.log(voice);
      console.table(position);
    },
  },
  computed: {
    menuPosition() {
      return {
        "padding-top": "20%",
      };
    },
    trainIconPosition() {
      // // return;
      // const activeVoice = document.querySelector("li.mouseHover")
      //   ? document.querySelector("li.mouseHover")
      //   : document.querySelector("li[data-index='1']");

      const activeVoice = document.querySelector("li[data-index='1']");

      if (!activeVoice) return;

      const position = activeVoice.getBoundingClientRect();
      const x = position.x;
      const y = position.y;

      return {
        left: x + "px",
        top: y + "px",
      };
    },
  },
});
</script>

<template>
  <ul class="menu" :style="menuPosition">
    <li
      data-index="1"
      @mouseenter="mouseEnterVoiceMenu(1)"
      @mouseleave="mouseLeaveVoiceMenu(1)"
    >
      <router-link to="/match">PLAY</router-link>
    </li>
    <li
      data-index="2"
      @mouseenter="mouseEnterVoiceMenu(2)"
      @mouseleave="mouseLeaveVoiceMenu(2)"
    >
      <router-link to="">STATISTICS</router-link>
    </li>
    <li
      data-index="3"
      @mouseenter="mouseEnterVoiceMenu(3)"
      @mouseleave="mouseLeaveVoiceMenu(3)"
    >
      <router-link to="">OPTIONS</router-link>
    </li>
    <li
      data-index="4"
      @mouseenter="mouseEnterVoiceMenu(4)"
      @mouseleave="mouseLeaveVoiceMenu(4)"
    >
      <router-link to="">CREDITS</router-link>
    </li>
  </ul>
  <div>
    <img
      class="trainIcon"
      src="../assets/sagomaTrenoWithoutBackground.png"
      :style="trainIconPosition"
    />
  </div>
</template>

<style>
ul.menu {
  background-image: url("../assets/topScreen.jpeg");
  background-repeat: no-repeat;
  background-size: cover 200%;
  background-position: center top;
  background-attachment: scroll;
  height: 100%;

  list-style-type: none;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ul.menu li {
  flex: 1;
}

ul.menu li a {
  color: #faf8d9;
  padding: 0.222rem;
  text-align: center;
  font-family: "Calibri (Body)";
  cursor: pointer;
  text-decoration: none;
}

ul.menu li:not(.mouseHover) {
  font-size: 30px;
  font-weight: bold;
}

ul.menu li.mouseHover {
  font-size: 40px;
  font-weight: bolder;
}

.trainIcon {
  width: 40px;
  position: absolute;
  -webkit-box-reflect: left v-bind(iconSpace);
  left: v-bind(iconX);
  top: v-bind(iconY);
  filter: invert(80%) contrast(50%);
  border-color: black;
  /* color: #faf8d9; */
}
</style>