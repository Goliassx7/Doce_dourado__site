/**
 * script.js
 * Funções essenciais para o site Doce Dourado.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica do Menu Mobile (Hamburger)
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            // Alterna a visibilidade do menu
            const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
            mobileMenu.style.display = isHidden ? 'block' : 'none';
        });

        // Fechar menu ao clicar em um link (para navegação em SPA)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
            });
        });
    }

    // 2. Lógica do Carrossel Principal (#inicio)
    // Foi desabilitada porque o carrossel principal tem apenas 1 slide,
    // tornando desnecessária a lógica de navegação.
    
    // 3. O Carrossel de Produtos na seção #produtos é controlado
    // inteiramente pelo CSS (propriedades 'overflow-x' e 'scroll-snap-type')
    // e, portanto, não requer lógica adicional em JavaScript.
});
