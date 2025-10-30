/**
 * script.js
 * Funções essenciais para o site Doce Dourado.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MODO CLARO/ESCURO ---
    let trilho = document.getElementById('trilho');
    const body = document.body; // Pega o body para aplicar o tema

    if (trilho) {
        trilho.addEventListener('click', ()=>{
            // 1. Anima o botão
            trilho.classList.toggle('dark'); 
            
            // 2. Muda o tema do site
            body.classList.toggle('light-mode'); 
        });
    }


    // --- LÓGICA DO MENU MOBILE (HAMBURGER) ---
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
        });

        // Fecha o menu ao clicar num link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
            });
        });
    }

    // --- LÓGICA DO FORMULÁRIO WHATSAPP (ATUALIZADA) ---
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
            const email = document.getElementById('email').value; // NOVO CAMPO
            const observacao = document.getElementById('observacao').value;

            // Monta a mensagem que será enviada
            const mensagem = `Olá! Vim pelo site e gostaria de fazer uma encomenda

Nome: ${nome}
Telefone: ${telefone}
Email: ${email}

Pedido/Observação:
${observacao}

Agradeço o contato!`;

            // Codifica a mensagem para ser usada em uma URL
            const mensagemCodificada = encodeURIComponent(mensagem);

            // Cria o link final para o WhatsApp
            // (Este é o link que estava no seu script original)
            const linkWhatsApp = `https://wa.me/18996993086?text=${mensagemCodificada}`;

            // Abre o link em uma nova aba
            window.open(linkWhatsApp, '_blank');
        });
    }

    // =============================================
    // LÓGICA DO CARROSSEL HERO
    // =============================================
    const heroTrack = document.querySelector('.carousel-track');
    if (heroTrack) {
        const slides = Array.from(heroTrack.children);
        const slideCount = slides.length;
        let currentIndex = 0;

        // Só ativa o carrossel se houver mais de 1 slide
        if (slideCount > 1) {
            // Define a transição no JS
            heroTrack.style.transition = 'transform 0.5s ease-in-out';

            // Define o intervalo para trocar de slide
            setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                heroTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            }, 5000); // Muda a cada 5 segundos
        }
    }
    
    // =============================================
    // LÓGICA DO ACCORDION (Perguntas Frequentes)
    // =============================================
    const faqPerguntas = document.querySelectorAll('.faq-pergunta');

    faqPerguntas.forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            // Encontra o 'faq-item' pai
            const item = pergunta.closest('.faq-item');
            if (item) {
                // Fecha todos os outros itens
                faqPerguntas.forEach(p => {
                    const outroItem = p.closest('.faq-item');
                    if (outroItem !== item && outroItem.classList.contains('active')) {
                        outroItem.classList.remove('active');
                    }
                });
                
                // Adiciona ou remove a classe 'active' no item clicado
                item.classList.toggle('active');
            }
        });
    });

    // =============================================
    // LÓGICA DO CARROSSEL DE PRODUTOS (LOOP)
    // =============================================
    const productTrack = document.querySelector('.grid-produtos');
    if (productTrack) {
        const productSlides = Array.from(productTrack.children);
        
        // Duplica os slides para criar o efeito de loop infinito
        productSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            productTrack.appendChild(clone);
        });
    }

    // =============================================
    // NOVA LÓGICA: AVALIAÇÃO COM ESTRELAS (FEEDBACK)
    // =============================================
    const estrelasInputContainer = document.querySelector('.estrelas-input');
    const estrelas = document.querySelectorAll('.estrelas-input span');
    const avaliacaoInput = document.getElementById('avaliacao');

    if (estrelasInputContainer && estrelas.length > 0 && avaliacaoInput) {
        
        // Remove o hover quando o mouse sai
        estrelasInputContainer.addEventListener('mouseleave', () => {
            const avaliacaoAtual = avaliacaoInput.value;
            // Se nenhuma estrela foi clicada (valor 0), limpa todas
            if (avaliacaoAtual === "0") {
                 estrelas.forEach(estrela => estrela.classList.remove('ativa'));
            } else {
                // Se já foi clicado, restaura a seleção
                atualizarEstrelas(avaliacaoAtual);
            }
        });

        estrelas.forEach(estrela => {
            // Adiciona o hover
            estrela.addEventListener('mouseover', () => {
                estrelas.forEach(e => e.classList.remove('ativa')); // Limpa visualização atual
                estrela.classList.add('ativa');
                
                // Seleciona todas as estrelas "anteriores" (que no HTML vêm depois, por causa do reverse)
                let el = estrela.nextElementSibling; // Usa next por causa do row-reverse
                while (el) {
                    el.classList.add('ativa');
                    el = el.nextElementSibling;
                }
            });

            // Define o clique
            estrela.addEventListener('click', () => {
                const valor = estrela.dataset.value;
                avaliacaoInput.value = valor; // Guarda o valor no input escondido
                estrelasInputContainer.classList.add('selecionado'); // Marca que foi selecionado
                atualizarEstrelas(valor); // Atualiza visualmente
            });
        });

        // Função para acender as estrelas com base num valor
        function atualizarEstrelas(valor) {
            estrelas.forEach(estrela => {
                // Compara o data-value de cada estrela com o valor clicado
                if (parseInt(estrela.dataset.value) <= parseInt(valor)) {
                    estrela.classList.add('ativa');
                } else {
                    estrela.classList.remove('ativa');
                }
            });
        }
    }

    // Simulação de envio do formulário de feedback
    const formFeedback = document.getElementById('form-feedback');
    const feedbackMensagem = document.getElementById('feedback-mensagem');
    
    if(formFeedback && feedbackMensagem) {
        formFeedback.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validação simples
            const descricao = document.getElementById('descricao-feedback').value;
            const nota = avaliacaoInput.value;
            
            if (descricao.trim() === "" || nota === "0") {
                alert("Por favor, preencha a descrição e dê uma nota de 1 a 5 estrelas.");
                return;
            }

            // Esconde o formulário e mostra a mensagem de sucesso
            formFeedback.style.display = "none";
            feedbackMensagem.style.display = "block";
            
            // (No mundo real, aqui você enviaria os dados para um backend/Firebase)
            console.log("Feedback Enviado (Simulado):");
            console.log("Nota:", nota);
            console.log("Nome:", document.getElementById('nome-feedback').value);
            console.log("Descrição:", descricao);
            
            // Opcional: esconde a mensagem e mostra o form novamente após 5 segundos
            setTimeout(() => {
                 formFeedback.style.display = "flex"; // 'flex' pois é a regra do .formulario
                 feedbackMensagem.style.display = "none";
                 
                 // Limpa o formulário
                 formFeedback.reset();
                 avaliacaoInput.value = "0";
                 estrelasInputContainer.classList.remove('selecionado');
                 atualizarEstrelas(0);
            }, 5000);
        });
    }

});

