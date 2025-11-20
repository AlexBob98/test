export default class InitSwiperSlider {
  constructor() {
    this.newArrivalSliderSection = document.querySelector(".new-arrivals__slider");
    this.init();
  }

  init() {
    this.HeroSlider();

    if (this.newArrivalSliderSection) {
      this.NewArrivalSlider();
    }
  }

  HeroSlider() {
    new Swiper(".hero__slider", {
      loop: true,
      speed: 1000,
      navigation: {
        prevEl: [
          ...document.querySelectorAll(".hero__nav--prev"),
          ...document.querySelectorAll(
            ".hero__inner .slider-bullet__nav--prev",
          ),
        ],
        nextEl: [
          ...document.querySelectorAll(".hero__nav--next"),
          ...document.querySelectorAll(
            ".hero__inner .slider-bullet__nav--next",
          ),
        ],
      },
      pagination: {
        el: ".hero__inner .slider-bullets",
        clickable: true,
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
      },
    });
  }

  NewArrivalSlider() {
    new Swiper(".new-arrivals__slider", {
      spaceBetween: 20,
      initialSlide: 1,
      loop: true,
      allowTouchMove: false,
      navigation: {
        prevEl: ".new-arrivals__slider .slider-bullet__nav--prev",
        nextEl: ".new-arrivals__slider .slider-bullet__nav--next",
      },
      pagination: {
        el: ".new-arrivals__slider .slider-bullets",
        clickable: true,
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
        },
        1680: {
          slidesPerView: 5,
        },
      },
    });
  }
}
