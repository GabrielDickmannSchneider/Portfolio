// Adicionar ao seu arquivo main.js

$(function () {
    // Menu toggle existente
    $(".toggle").on("click", function () {
        if ($(".item").hasClass("active")) {
            $(".item").removeClass("active");
        } else {
            $(".item").addClass("active");
        }
    });

    // NOVO: Validação do formulário de contato
    function validateForm() {
        const name = $('input[placeholder="NOME"]').val().trim();
        const email = $('input[placeholder="EMAIL"]').val().trim();
        const message = $('input[placeholder="MENSAGEM"]').val().trim();
        
        let isValid = true;
        let errorMessage = '';

        // Validar nome
        if (name === '') {
            errorMessage += 'Nome é obrigatório.\n';
            isValid = false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            errorMessage += 'Email é obrigatório.\n';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errorMessage += 'Email inválido.\n';
            isValid = false;
        }

        // Validar mensagem
        if (message === '') {
            errorMessage += 'Mensagem é obrigatória.\n';
            isValid = false;
        }

        if (!isValid) {
            alert(errorMessage);
            return false;
        }

        alert('Formulário enviado com sucesso!');
        return true;
    }

    // Event listener para o botão ENVIAR
    $('.app-form-button:contains("ENVIAR")').on('click', function(e) {
        e.preventDefault();
        validateForm();
    });

    // Event listener para o botão CANCELAR
    $('.app-form-button:contains("CANCELAR")').on('click', function(e) {
        e.preventDefault();
        $('input[placeholder="NOME"]').val('');
        $('input[placeholder="EMAIL"]').val('');
        $('input[placeholder="MENSAGEM"]').val('');
        alert('Formulário limpo!');
    });

    // NOVO: Efeito de animação suave para scroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // NOVO: Efeito de fade in nos cards quando entram na tela
    function fadeInCards() {
        $('.blog-personal').each(function() {
            const cardTop = $(this).offset().top;
            const cardBottom = cardTop + $(this).outerHeight();
            const windowTop = $(window).scrollTop();
            const windowBottom = windowTop + $(window).height();

            if (cardBottom > windowTop && cardTop < windowBottom) {
                $(this).addClass('fade-in');
            }
        });
    }

    // Executar fade in no scroll
    $(window).on('scroll', fadeInCards);
    fadeInCards(); // Executar na carga da página

    // NOVO: Efeito de typing na página inicial
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Aplicar efeito de typing no título principal (apenas na página inicial)
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.includes('projetos.html')) {
        const mainTitle = $('.blog-personal-content-title').first();
        if (mainTitle.length) {
            const originalText = mainTitle.text();
            typeWriter(mainTitle[0], originalText, 80);
        }
    }

    // NOVO: Efeito de loading nos botões
    $('.blog-personal-button, .contact-btn').on('click', function(e) {
        const $button = $(this);
        const originalText = $button.text();
        
        $button.text('Carregando...');
        $button.css('opacity', '0.7');
        
        setTimeout(() => {
            $button.text(originalText);
            $button.css('opacity', '1');
        }, 1000);
    });

    // NOVO: Contador de caracteres para mensagem
    $('input[placeholder="MENSAGEM"]').on('input', function() {
        const maxLength = 500;
        const currentLength = $(this).val().length;
        const remaining = maxLength - currentLength;
        
        // Remover contador existente
        $('.char-counter').remove();
        
        // Adicionar contador
        $('<div class="char-counter" style="color: #666; font-size: 12px; margin-top: 5px;">')
            .text(`${remaining} caracteres restantes`)
            .insertAfter(this);
            
        // Alterar cor se próximo do limite
        if (remaining < 50) {
            $('.char-counter').css('color', '#ff6b6b');
        }
    });
});

// Adicionar CSS para animações
const fadeInCSS = `
<style>
.blog-personal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.blog-personal.fade-in {
    opacity: 1;
    transform: translateY(0);
}

.typing-cursor::after {
    content: '|';
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.char-counter {
    transition: color 0.3s ease;
}

.loading-button {
    pointer-events: none;
    cursor: not-allowed;
}
</style>
`;

// Adicionar CSS ao head
$('head').append(fadeInCSS);