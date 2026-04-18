const filterButtons = document.querySelectorAll(".filter-chip");
const products = document.querySelectorAll(".product-card");
const filterLinks = document.querySelectorAll("[data-filter-link]");
const year = document.querySelector("#year");
const contactForm = document.querySelector("#contact-form");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const whatsappNumber = "5500000000000";

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

const countdownTarget = new Date();
countdownTarget.setDate(countdownTarget.getDate() + 6);
countdownTarget.setHours(20, 0, 0, 0);

function updateCountdown() {
  const diff = Math.max(countdownTarget.getTime() - Date.now(), 0);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  document.querySelector('[data-count="days"]').textContent = String(days).padStart(2, "0");
  document.querySelector('[data-count="hours"]').textContent = String(hours).padStart(2, "0");
  document.querySelector('[data-count="minutes"]').textContent = String(minutes).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 60000);

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector("#nome")?.value?.trim() || "Cliente";
    const model = contactForm.querySelector("#modelo")?.value || "um amigurumi";
    const message =
      contactForm.querySelector("#mensagem")?.value?.trim() ||
      "Gostaria de saber mais sobre disponibilidade, cores e prazo.";

    const text = encodeURIComponent(`Oi! Meu nome e ${name}. Quero reservar: ${model}. ${message}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener");
  });
}
