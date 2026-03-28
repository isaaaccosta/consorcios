// =================== CONFIGURE AQUI ===================

// WhatsApp no formato internacional: 55 + DDD + número (sem espaços)
// Ex: "5554999999999"
const WHATSAPP_NUMBER = "54999625395";

// Nome do vendedor (aparece em 3 lugares)
const SELLER_NAME = "Seu Nome Aqui";

// Endereço do local físico (como você quer que apareça no site)
const PHYSICAL_ADDRESS_TEXT = "Rua Exemplo, 123 — Centro, Sua Cidade/UF";

// Link do Google Maps do local (pode ser link compartilhado ou pesquisa)
// Opção 1 (pesquisa): https://www.google.com/maps?q=Rua+Exemplo+123+Sua+Cidade
// Opção 2 (link compartilhado do Maps): cole aqui
const MAPS_PLACE_URL = "https://www.google.com/maps?q=Rua+Exemplo,+123,+Centro,+Sua+Cidade";

// (Opcional) Link de rota com destino fixo (abre rota direto)
// Se quiser, pode deixar igual ao MAPS_PLACE_URL; o Maps já deixa traçar rota também
const MAPS_ROUTE_URL = "https://www.google.com/maps/dir/?api=1&destination=Rua+Exemplo,+123,+Centro,+Sua+Cidade";

// =================== FUNÇÕES ===================

function buildMessage({ tipo = "", nome = "", valor = "", prazo = "", acao = "", msg = "" } = {}) {
  const lines = [
    "Olá! Quero uma simulação de consórcio.",
    tipo ? `Tipo: ${tipo}` : "",
    nome ? `Nome: ${nome}` : "",
    valor ? `Valor da carta: ${valor}` : "",
    prazo ? `Prazo/Parcela: ${prazo}` : "",
    acao ? `Quero entender: ${acao}` : "",
    msg ? `Obs: ${msg}` : "",
  ].filter(Boolean);

  return lines.join("\n");
}

function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function setLink(el, url) {
  if (!el) return;
  el.href = url;
  el.target = "_blank";
  el.rel = "noopener";
}

// =================== NAV MOBILE ===================
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");

if (menuBtn) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
}

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// =================== SETAR NOME/ENDEREÇO ===================
const sellerSlots = ["sellerName", "sellerName2", "sellerName3"];
sellerSlots.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.textContent = SELLER_NAME;
});

const addressText = document.getElementById("addressText");
if (addressText) addressText.textContent = PHYSICAL_ADDRESS_TEXT;

// =================== CTAs WhatsApp ===================
const navCta = document.getElementById("navCta");
const heroCta = document.getElementById("heroCta");
const waFloat = document.getElementById("waFloat");
const contactCta = document.getElementById("contactCta");
const cardCta = document.getElementById("cardCta");
const localCta = document.getElementById("localCta");

const defaultMsg = buildMessage({ tipo: "Quero simular" });
[navCta, heroCta, waFloat, contactCta, cardCta, localCta].forEach(el => {
  setLink(el, waLink(defaultMsg));
});

// =================== MAPS LINKS ===================
setLink(document.getElementById("mapsBtn"), MAPS_PLACE_URL);
setLink(document.getElementById("routeBtn"), MAPS_ROUTE_URL);
setLink(document.getElementById("mapsHeroBtn"), MAPS_PLACE_URL);
setLink(document.getElementById("mapsCardBtn"), MAPS_PLACE_URL);

// =================== Botões: simular por tipo ===================
document.querySelectorAll("[data-tipo]").forEach(btn => {
  btn.addEventListener("click", () => {
    const tipo = btn.getAttribute("data-tipo") || "Consórcio";
    window.open(waLink(buildMessage({ tipo })), "_blank", "noopener");
  });
});

// =================== Botões: ações (como funciona) ===================
document.querySelectorAll("[data-acao]").forEach(btn => {
  btn.addEventListener("click", () => {
    const acao = btn.getAttribute("data-acao") || "Informações";
    window.open(waLink(buildMessage({ acao })), "_blank", "noopener");
  });
});

// =================== Formulário -> WhatsApp ===================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("fName").value.trim();
    const tipo = document.getElementById("fTipo").value;
    const valor = document.getElementById("fValor").value.trim();
    const prazo = document.getElementById("fPrazo").value.trim();
    const msg = document.getElementById("fMsg").value.trim();

    const message = buildMessage({ tipo, nome, valor, prazo, msg });
    window.open(waLink(message), "_blank", "noopener");
  });
}

// =================== Year ===================
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

const fValor = document.getElementById("fValor");

function maskBRL(v) {
  v = (v || "").replace(/\D/g, "");          // só dígitos
  v = v.replace(/^0+/, "");                 // tira zeros à esquerda
  if (!v) return "";

  // garante ao menos 3 dígitos pra ter centavos
  while (v.length < 3) v = "0" + v;

  const cents = v.slice(-2);
  let ints = v.slice(0, -2);

  // separador de milhar
  ints = ints.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${ints},${cents}`;
}

if (fValor) {
  fValor.addEventListener("input", () => {
    const old = fValor.value;
    fValor.value = maskBRL(old);
  });
}