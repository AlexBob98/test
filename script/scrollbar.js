export default class InitScrollBar {
  constructor() {
    this.scrollContainers = document.querySelectorAll("[data-scrollbar]");
    this.init();
  }

  init() {
    if (this.scrollContainers.length) {
      this.InitScrollBarInContainer();
    }
  }

  InitScrollBarInContainer() {
    this.scrollContainers.forEach((container) => {
      const scrollbar = document.createElement("div");
      scrollbar.classList.add("custom-scrollbar");
      const thumb = document.createElement("div");
      thumb.classList.add("custom-scrollbar-thumb");
      scrollbar.appendChild(thumb);

      container.after(scrollbar);

      const update = () => this.updateScrollbar(container, scrollbar, thumb);

      container.addEventListener("scroll", update);
      window.addEventListener("resize", update);

      let isDragging = false;

      const onDragStart = (e) => {
        isDragging = true;
        e.preventDefault();
      };

      const onDragMove = (e) => {
        if (!isDragging) return;
        const clientX = e.type.startsWith('touch')
          ? e.touches[0].clientX
          : e.clientX;

        const trackRect = scrollbar.getBoundingClientRect();
        const offsetX = clientX - trackRect.left;
        const trackWidth = trackRect.width;
        const scrollPercent = Math.max(0, Math.min(1, offsetX / trackWidth));
        container.scrollLeft = scrollPercent * (container.scrollWidth - container.clientWidth);
      };

      const onDragEnd = () => {
        isDragging = false;
      };

      thumb.addEventListener("mousedown", onDragStart);
      window.addEventListener("mousemove", onDragMove);
      window.addEventListener("mouseup", onDragEnd);

      thumb.addEventListener("touchstart", onDragStart, { passive: false });
      window.addEventListener("touchmove", onDragMove, { passive: false });
      window.addEventListener("touchend", onDragEnd);

      update();
    });
  }

  updateScrollbar(container, scrollbar, thumb) {
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;

    if (scrollWidth <= containerWidth) {
      scrollbar.style.display = "none";
      return;
    }
    scrollbar.style.display = "flex";

    const thumbWidth = (containerWidth / scrollWidth) * 63;
    thumb.style.width = `${thumbWidth}%`;

    const maxScroll = scrollWidth - containerWidth;
    if (maxScroll <= 0) return;

    const thumbPosition = (scrollLeft / maxScroll) * (100 - thumbWidth);
    thumb.style.left = `${thumbPosition}%`;
  }
}