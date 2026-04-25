const bolos = [
  {
    nome: "Chocolate belga",
    desc: "Massa úmida, ganache amarga e raspas de cacau.",
    preco: "A partir de R$ 120 (20 cm)",
  },
  {
    nome: "Limão siciliano",
    desc: "Creme de limão caseiro e merengue levemente tostado.",
    preco: "A partir de R$ 110 (20 cm)",
  },
  {
    nome: "Ninho com morango",
    desc: "Recheio cremoso e frutas frescas da estação.",
    preco: "A partir de R$ 135 (20 cm)",
  },
  {
    nome: "Casamento (andares)",
    desc: "Projeto sob medida, degustação inclusa.",
    preco: "Sob consulta",
  },
  {
    nome: "Cenoura com brigadeiro",
    desc: "Clássico de conforto, cobertura generosa.",
    preco: "A partir de R$ 95 (20 cm)",
  },
  {
    nome: "Fatia gourmet",
    desc: "Sabores rotativos às quartas e sábados.",
    preco: "R$ 16 a R$ 22",
  },
];

function renderMenu() {
  const list = document.getElementById("menu-list");
  if (!list) return;
  list.innerHTML = bolos
    .map(
      (b) => `
    <li>
      <article class="menu-card">
        <h3>${escapeHtml(b.nome)}</h3>
        <p>${escapeHtml(b.desc)}</p>
        <p class="menu-price">${escapeHtml(b.preco)}</p>
      </article>
    </li>`
    )
    .join("");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.getAttribute("data-scroll");
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.getElementById("year").textContent = String(new Date().getFullYear());

document.getElementById("contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  if (!(form instanceof HTMLFormElement)) return;

  const formData = new FormData(form);
  const nome = String(formData.get("nome") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const mensagem = String(formData.get("mensagem") || "").trim();

  const texto = [
    "Oi! Vim pelo site da Confeitaria Doce Alice.",
    "",
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `Mensagem: ${mensagem}`,
  ].join("\n");

  const numeroWhatsapp = "5511990059035";
  const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(texto)}`;
  const novaAba = window.open(urlWhatsapp, "_blank", "noopener,noreferrer");
  if (!novaAba) {
    // Fallback para navegadores que bloqueiam pop-up.
    window.location.href = urlWhatsapp;
  }

  const feedback = document.getElementById("form-feedback");
  if (feedback) {
    feedback.textContent = "Abrimos o WhatsApp com a sua mensagem preenchida.";
  }
  form.reset();
});

renderMenu();
