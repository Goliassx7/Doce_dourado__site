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
            mobileMenu.classList.toggle('is-open');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
            });
        });
    }

    // --- NOVO CÓDIGO PARA O FORMULÁRIO DE ENCOMENDA ---

    // 2. Lógica do Formulário de Encomendas para WhatsApp
    const formEncomenda = document.getElementById('form-encomenda');

    if (formEncomenda) {
        formEncomenda.addEventListener('submit', function(event) {
            // Impede que o formulário seja enviado da forma tradicional
            event.preventDefault();

            // Coloque aqui o seu número de WhatsApp no formato internacional
            const numeroTelefone = '5511999998888'; // Exemplo: +55 (11) 99999-8888

            // Pega os valores dos campos do formulário
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const observacao = document.getElementById('observacao').value;

            // Monta a mensagem que será enviada
            const mensagem = `Olá! Vim pelo site e gostaria de fazer uma encomenda

Nome: ${nome}
Telefone: ${telefone}

Pedido/Observação:
${observacao}

Agradeço o contato!`;

            // Codifica a mensagem para ser usada em uma URL
            const mensagemCodificada = encodeURIComponent(mensagem);

            // Cria o link final para o WhatsApp
            const linkWhatsApp = `https://wa.me/18996993086
?text=${mensagemCodificada}`;

            // Abre o link em uma nova aba
            window.open(linkWhatsApp, '_blank');
        });
    }
});