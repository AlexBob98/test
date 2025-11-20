export default class ActionsButtonHelper {
  constructor() {
    this.init();
  }

  init() {
    this.initActionButtons();
  }

  initActionButtons() {
    const actionsBtn = document.querySelectorAll("[data-action]:not([data-action='cart'])");
    const cartBtns = document.querySelectorAll("[data-action='cart']");

    actionsBtn.forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;
        const isActive = button.classList.toggle("add");
        const actionBadges = document.querySelectorAll(`[data-badge="${action}"]`);

        actionBadges.forEach((badge) => {
          let count = parseInt(badge.textContent, 10) || 0;
          badge.textContent = isActive ? count + 1 : Math.max(0, count - 1);
        });
      });
    });

    cartBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("cart-increment")) {
          let count = parseInt(button.dataset.count, 10) || 1;
          button.dataset.count = count + 1;
          this.updateCartButtonUI(button, count + 1);
          this.updateCartBadge();
          return;
        }

        if (target.classList.contains("cart-decrement")) {
          let count = parseInt(button.dataset.count, 10) || 1;
          if (count > 1) {
            button.dataset.count = count - 1;
            this.updateCartButtonUI(button, count - 1);
          } else {
            this.removeFromCart(button);
          }
          this.updateCartBadge();
          return;
        }

        if (!button.classList.contains("in-cart")) {
          button.classList.add("in-cart");
          button.dataset.count = "1";
          this.updateCartButtonUI(button, 1);
          this.updateCartBadge();
        }
      });
    });
  }

  updateCartButtonUI(button, count) {
    button.innerHTML = `
    <span class="cart-count">${count}</span>
    <span class="cart-decrement icon minus" aria-label="Уменьшить количество"></span>
    <span class="cart-increment icon plus" aria-label="Увеличить количество"></span>
  `;
  }

  removeFromCart(button) {
    button.classList.remove("in-cart");
    delete button.dataset.count;
    button.innerHTML = "В корзину";
    this.updateCartBadge();
  }

  updateCartBadge() {
    const badges = document.querySelectorAll('[data-badge="cart"]');
    if (!badges) return;

    let totalCount = 0;
    document
      .querySelectorAll(".product-card__add-to-cart.in-cart")
      .forEach((btn) => {
        const count = parseInt(btn.dataset.count, 10) || 1;
        totalCount += count;
      });
    badges.forEach((badge) => (badge.textContent = totalCount));
  }
}