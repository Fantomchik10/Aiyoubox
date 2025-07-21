// Обработка FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const toggle = question.querySelector('.faq-toggle');
        
        // Закрываем все открытые элементы
        document.querySelectorAll('.faq-answer').forEach(ans => {
            if (ans !== answer && ans.classList.contains('show')) {
                ans.classList.remove('show');
                ans.previousElementSibling.querySelector('.faq-toggle').textContent = '+';
            }
        });
        
        // Переключаем текущий элемент
        answer.classList.toggle('show');
        toggle.textContent = answer.classList.contains('show') ? '−' : '+';
    });
});

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню после клика
            if (window.innerWidth <= 768) {
                document.querySelector('nav').classList.remove('active');
            }
        }
    });
});

// Обработка формы
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const responsePromise = document.querySelector('.response-promise');
        
        // Показываем таймер
        responsePromise.innerHTML = `
            <div class="timer-container">
                <div class="timer">5:00</div>
                <p>Ожидайте звонка в течение 5 минут!</p>
            </div>
        `;
        
        // Запускаем таймер
        let timeLeft = 5 * 60; // 5 минут в секундах
        const timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            document.querySelector('.timer').textContent = 
                `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                responsePromise.innerHTML = `
                    <div class="promise-icon">⏱️</div>
                    <p>Пожалуйста, свяжитесь с нами в Telegram</p>
                `;
                
                // Добавляем кнопку для перехода в Telegram
                const telegramLink = document.createElement('a');
                telegramLink.href = 'https://t.me/Aiyoubox';
                telegramLink.target = '_blank';
                telegramLink.className = 'btn telegram-btn';
                telegramLink.innerHTML = '<i class="fa-brands fa-telegram"></i> Написать в Telegram';
                telegramLink.style.marginTop = '15px';
                telegramLink.style.display = 'inline-block';
                
                responsePromise.appendChild(telegramLink);
            }
        }, 1000);
        
        // Здесь должна быть реальная логика отправки
        setTimeout(() => {
            alert('Спасибо! Мы свяжемся с вами в течение 5 минут.');
            this.reset();
        }, 1500);
    });
}

// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
});

// Закрытие меню при клике на пункт
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('nav').classList.remove('active');
        }
    });
});

// Анимация при скролле
function checkScroll() {
    document.querySelectorAll('.service-step, .value-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.classList.add('in-view');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);