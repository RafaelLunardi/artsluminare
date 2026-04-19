const filterButtons = document.querySelectorAll(".filter-chip");
const products = document.querySelectorAll(".product-card");
const filterLinks = document.querySelectorAll("[data-filter-link]");
const year = document.querySelector("#year");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

function applyFilter(filter) {
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  products.forEach((card) => {
    const visible = filter === "todos" || card.dataset.category === filter;
    card.hidden = !visible;
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

filterLinks.forEach((link) => {
  link.addEventListener("click", () => {
    applyFilter(link.dataset.filterLink);
    mainNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-menu-open");
  });
});

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const open = !mainNav.classList.contains("is-open");
    mainNav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-menu-open", open);
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}
