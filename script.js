/* =========================
HERO SWIPER
========================= */
const heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 1200,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true }
});

/* =========================
HEADER SCROLL EFFECT
========================= */
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});

/* =========================
PRODUTOS — carregados do produtos.json
========================= */
let produtos = [];

fetch("data/produtos.json?v=" + VERSAO)
    .then(r => r.json())
    .then(data => { produtos = data; })
    .catch(() => console.warn("Erro ao carregar produtos.json"));

/* =========================
SHOWCASE OPEN
========================= */
function openShowcase(id){
    const produto = produtos.find(p => p.id === id);
    if(!produto) return;

    document.getElementById("productName").textContent      = produto.nome;
    document.getElementById("productDesc").textContent      = produto.descricao;
    document.getElementById("productCategoria").textContent = produto.categoria;

    if(produto.notas){
        document.getElementById("notasTopo").textContent    = produto.notas.topo    || "";
        document.getElementById("notasCoracao").textContent = produto.notas.coracao || "";
        document.getElementById("notasFundo").textContent   = produto.notas.fundo   || "";
        document.querySelector(".piramide").style.display = "block";
    } else {
        document.querySelector(".piramide").style.display = "none";
    }

    document.getElementById("productWhatsapp").href = getWhatsAppLink("Olá! Tenho interesse no perfume " + produto.whatsapp);

    const wrapper = document.getElementById("showcaseWrapper");
    wrapper.innerHTML = "";
    produto.imagens.forEach(img => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `<img src="${img}" alt="${produto.nome}">`;
        wrapper.appendChild(slide);
    });

    document.getElementById("showcase").classList.add("active");

    setTimeout(() => {
        if(window.showcaseSwiper) window.showcaseSwiper.destroy(true, true);
        window.showcaseSwiper = new Swiper(".showcaseSwiper", {
            loop: produto.imagens.length > 1,
            pagination: { el: ".showcaseSwiper .swiper-pagination", clickable: true }
        });
    }, 100);
}

/* =========================
SHOWCASE CLOSE
========================= */
function closeShowcase(){
    document.getElementById("showcase").classList.remove("active");
}
