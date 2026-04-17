const filterButtons = document.querySelectorAll(".filter-chip");
const products = document.querySelectorAll(".product-card");
const filterLinks = document.querySelectorAll("[data-filter-link]");
const year = document.querySelector("#year");
const contactForm = document.querySelector("#contact-form");
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
  link.addEventListener("click", () => applyFilter(link.dataset.filterLink));
});

if (year) {
  year.textContent = new Date().getFullYear();
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector("#nome")?.value?.trim() || "Cliente";
    const message =
      contactForm.querySelector("#mensagem")?.value?.trim() ||
      "Gostaria de saber mais sobre um amigurumi da ArtsLuminare.";

    const text = encodeURIComponent(`Oi! Meu nome e ${name}. ${message}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener");
  });
}
