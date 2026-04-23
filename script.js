const filterButtons = document.querySelectorAll(".filter-chip");
const products = document.querySelectorAll(".product-card");
const filterLinks = document.querySelectorAll("[data-filter-link]");
const year = document.querySelector("#year");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const themeToggle = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(dark));
  themeToggle?.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
  if (themeToggle) {
    themeToggle.querySelector("span").textContent = dark ? "☀" : "☾";
  }
  themeMeta?.setAttribute("content", dark ? "#080708" : "#101010");
  try {
    localStorage.setItem("artsluminare-theme", dark ? "dark" : "light");
  } catch {}
}

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

if (themeToggle) {
  const savedTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  setTheme(savedTheme);
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}
