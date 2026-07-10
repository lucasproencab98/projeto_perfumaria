/* =========================
HERO SWIPER
========================= */
const heroSwiper = new Swiper(".heroSwiper", {

    loop: true,

    effect: "fade",

    fadeEffect: {
        crossFade: true
    },

    speed: 1200,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false
	},

    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }

});


/* =========================
HEADER SCROLL EFFECT
========================= */
window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if(window.scrollY > 50){
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================
PRODUTOS — dados embutidos (sem fetch)
========================= */
const produtos = [
    {
        id: 1,
        nome: "Ocean",
        categoria: "Masculino",
        descricao: "Uma fragrância inspirada na força e profundidade do oceano. Fresca, intensa e marcante, Ocean carrega a essência do mar em cada borrifo.",
        notas: { topo: "Bergamota, Limão siciliano, Ozônico", coracao: "Flor de Lotus, Jasmin, Algas marinhas", fundo: "Âmbar, Sândalo, Almíscar branco" },
        imagens: ["imagens/produtos/perfumes/ocean.png"],
        whatsapp: "Ocean"
    },
    {
        id: 2,
        nome: "Máfios",
        categoria: "Masculino",
        descricao: "Poder, elegância e presença em uma fragrância intensa. Máfios foi criado para homens que deixam marcas onde passam.",
        notas: { topo: "Pimenta negra, Cardamomo, Bergamota", coracao: "Couro, Oud, Violeta", fundo: "Vetiver, Âmbar escuro, Baunilha" },
        imagens: ["imagens/produtos/perfumes/mafios.png"],
        whatsapp: "Mafios"
    },
    {
        id: 3,
        nome: "Zariah",
        categoria: "Feminino",
        descricao: "Essência sedutora e mistérios perigosos. Zariah é uma fragrância que envolve, conquista e nunca é esquecida.",
        notas: { topo: "Rosa turca, Frutas vermelhas, Groselha", coracao: "Peônia, Íris, Patchouli", fundo: "Almíscar rosado, Baunilha, Sândalo" },
        imagens: ["imagens/produtos/perfumes/zaraia.png"],
        whatsapp: "Zariah"
    },
    {
        id: 4,
        nome: "Anurb'y",
        categoria: "Unissex",
        descricao: "Extremamente gostoso, suculento e efervescente. Anurb'y é alegria pura em forma de fragrância.",
        notas: { topo: "Maracujá, Manga, Pitaya", coracao: "Flor de laranjeira, Jasmim, Caramelo", fundo: "Coco, Baunilha cremosa, Almíscar" },
        imagens: ["imagens/produtos/perfumes/anurby.png"],
        whatsapp: "Anurby"
    },
    {
        id: 5,
        nome: "Blood & Silk Noir",
        categoria: "Feminino",
        descricao: "Uma presença. Um desejo que deixa marcas mesmo quando você some. Blood & Silk Noir é pura sedução em frasco.",
        notas: { topo: "Ameixa, Framboesa negra, Especiarias", coracao: "Rosa negra, Oud, Incenso", fundo: "Couro suave, Âmbar, Almíscar escuro" },
        imagens: ["imagens/produtos/perfumes/bloodesilk.png"],
        whatsapp: "Blood Silk Noir"
    }
];


/* =========================
SHOWCASE OPEN
========================= */
function openShowcase(id){

    const produto = produtos.find(p => p.id === id);

    if(!produto) return;

    // Preenche info
    document.getElementById("productName").textContent = produto.nome;
    document.getElementById("productDesc").textContent = produto.descricao;
    document.getElementById("productCategoria").textContent = produto.categoria;

    // Pirâmide olfativa
    if(produto.notas){
        document.getElementById("notasTopo").textContent    = produto.notas.topo    || "";
        document.getElementById("notasCoracao").textContent = produto.notas.coracao || "";
        document.getElementById("notasFundo").textContent   = produto.notas.fundo   || "";
        document.querySelector(".piramide").style.display = "block";
    } else {
        document.querySelector(".piramide").style.display = "none";
    }

    // Link WhatsApp
    const msg = encodeURIComponent("Olá! Tenho interesse no perfume " + produto.whatsapp);
    document.getElementById("productWhatsapp").href = "https://wa.me/?text=" + msg;

    // Preenche imagens no swiper
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

        if(window.showcaseSwiper){
            window.showcaseSwiper.destroy(true, true);
        }

        window.showcaseSwiper = new Swiper(".showcaseSwiper", {

            loop: produto.imagens.length > 1,

            pagination: {
                el: ".showcaseSwiper .swiper-pagination",
                clickable: true
            }

        });

    }, 100);

}


/* =========================
SHOWCASE CLOSE
========================= */
function closeShowcase(){
    document.getElementById("showcase").classList.remove("active");
}
