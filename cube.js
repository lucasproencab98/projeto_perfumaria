/* =========================
   MENU ATIVO
========================= */
(function(){

    // Detecta qual página está ativa
    const page = document.body.dataset.page;

    // Marca o link ativo no menu
    document.querySelectorAll('.menu a[data-page], .menu-mobile-links a[data-page]').forEach(link => {
        if(link.dataset.page === page){
            link.classList.add('active');
        }
    });

    // Clique no link da própria página: só rola suave até o topo
    document.querySelectorAll('.menu a[data-page], .menu-mobile-links a[data-page]').forEach(link => {
        link.addEventListener('click', function(e){
            if(this.dataset.page === page){
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const menu = document.getElementById('menuMobile');
                if(menu && menu.classList.contains('open')) toggleMenu();
            }
        });
    });

})();

/* =========================
MENU MOBILE
========================= */
function toggleMenu(){
    const menu    = document.getElementById('menuMobile');
    const overlay = document.getElementById('menuOverlay');
    const burger  = document.getElementById('hamburger');

    if(!menu) return;

    const open = menu.classList.toggle('open');
    overlay.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
}

