/* =========================
   CUBE PAGE TRANSITION
========================= */
(function(){

    // Detecta qual página está ativa
    const page = document.body.dataset.page;

    const pages = {
        'inicio':      'index.html',
        'perfumes':    'perfumes.html',
        'cosmeticos':  'cosmeticos.html',
        'marca':       'marca.html',
        'contato':     'contato.html'
    };

    // Marca o link ativo no menu
    document.querySelectorAll('.menu a[data-page]').forEach(link => {
        if(link.dataset.page === page){
            link.classList.add('active');
        }
    });

    // Intercepta cliques no menu
    document.querySelectorAll('.menu a[data-page], .menu-mobile-links a[data-page]').forEach(link => {
        link.addEventListener('click', function(e){
            e.preventDefault();

            const destPage = this.dataset.page;

            // já está na página — volta ao topo suavemente
            if(destPage === page){
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // fecha menu mobile se estiver aberto
                const menu = document.getElementById('menuMobile');
                if(menu && menu.classList.contains('open')) toggleMenu();
                return;
            }

            const destUrl = pages[destPage];
            const currentIndex = Object.keys(pages).indexOf(page);
            const destIndex   = Object.keys(pages).indexOf(destPage);
            const direction   = destIndex > currentIndex ? 'left' : 'right';

            triggerCube(direction, destUrl);
        });
    });

    function triggerCube(direction, url){

        // Cria o container do cubo
        const cube = document.createElement('div');
        cube.id = 'cube-transition';

        // Face atual (página atual)
        const faceCurrent = document.createElement('div');
        faceCurrent.className = 'cube-face cube-current';
        faceCurrent.style.backgroundImage = `url(${window.location.href})`;

        // Face próxima (cor sólida do tema enquanto carrega)
        const faceNext = document.createElement('div');
        faceNext.className = 'cube-face cube-next';

        cube.appendChild(faceCurrent);
        cube.appendChild(faceNext);
        document.body.appendChild(cube);

        // Força reflow
        cube.getBoundingClientRect();

        // Dispara animação
        cube.classList.add('animate-' + direction);

        cube.addEventListener('animationend', () => {
            window.location.href = url;
        });
    }

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
