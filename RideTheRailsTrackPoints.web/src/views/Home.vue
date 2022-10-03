<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const firstVoice = document.querySelector('li[data-index="1"]');
    const position = this.getPosition(firstVoice);
    return {
      iconX: position.x + "px",
      iconY: position.y + "px",
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
        : { x: 600, y: 600 };

      const x = position.x;
      const y = position.y;
      return { x, y };
    },
    changeIconPosition(voice) {
      const position = this.getPosition(voice);
      this.iconX = position.x + "px";
      this.iconY = position.y + "px";
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
      PLAY
    </li>
    <li
      data-index="2"
      @mouseenter="mouseEnterVoiceMenu(2)"
      @mouseleave="mouseLeaveVoiceMenu(2)"
    >
      STATISTICS
    </li>
    <li
      data-index="3"
      @mouseenter="mouseEnterVoiceMenu(3)"
      @mouseleave="mouseLeaveVoiceMenu(3)"
    >
      OPTIONS
    </li>
    <li
      data-index="4"
      @mouseenter="mouseEnterVoiceMenu(4)"
      @mouseleave="mouseLeaveVoiceMenu(4)"
    >
      CREDITS
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
body {
  background-image: url("../assets/topScreen.jpeg");
  background-repeat: no-repeat;
  background-size: cover 150%;
  background-position: center top;
  background-attachment: scroll;
}

ul.menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  list-style-type: none;
}

ul.menu li {
  color: #faf8d9;
  padding: 0.222rem;
  text-align: center;
  font-family: "Calibri (Body)";
  cursor: pointer;
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
  -webkit-box-reflect: left;
  left: v-bind(iconX);
  top: v-bind(iconY);
}
</style>