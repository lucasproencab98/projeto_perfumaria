/* =========================
CONFIGURAÇÃO GERAL DO SITE
Para trocar o WhatsApp em TODO o site, altere só a linha abaixo.
========================= */
const WHATSAPP_NUMBER = "5515991386342"; // DDI + DDD + numero, só digitos
const VERSAO = "1.1"; // usado no cache-busting dos fetch de dados (produtos.json etc)

/* monta o link do whatsapp. mensagem é opcional */
function getWhatsAppLink(mensagem) {
    const base = "https://wa.me/" + WHATSAPP_NUMBER;
    return mensagem ? base + "?text=" + encodeURIComponent(mensagem) : base;
}

/* preenche automaticamente todo link marcado com data-whatsapp assim que a pagina carrega */
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
        const msg = el.getAttribute("data-whatsapp-msg");
        el.href = getWhatsAppLink(msg);
    });
});
