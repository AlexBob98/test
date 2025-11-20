
import InitScrollBar from "./scrollbar.js";
import InitSwiperSlider from "./slider.js";
import ActionsButtonHelper from "./action-button-helper.js";

document.addEventListener("DOMContentLoaded", () => {
  new ActionsButtonHelper();
  new InitScrollBar();
  new InitSwiperSlider();
});
