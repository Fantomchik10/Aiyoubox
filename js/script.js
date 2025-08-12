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
            // Динамический расчет высоты шапки
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 80;
            
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
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
        
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        this.classList.add('form-disabled');
        
        const responsePromise = document.querySelector('.response-promise');
        
        // Показываем таймер
        responsePromise.innerHTML = `
            <div class="timer-container">
                <div class="timer">5:00</div>
                <p>Ожидайте звонка в течение 5 минут!</p>
            </div>
        `;
        
        // Запускаем таймер
        let timeLeft = 5 * 60;
        const timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            const timerEl = document.querySelector('.timer');
            if (timerEl) {
                timerEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                responsePromise.innerHTML = `
                    <div class="promise-icon">⏱️</div>
                    <p>Пожалуйста, свяжитесь с нами в Telegram</p>
                `;
                
                // Добавляем кнопку Telegram
                const telegramLink = document.createElement('a');
                telegramLink.href = 'https://web.telegram.org/k/#@KorobkinFF';
                telegramLink.target = '_blank';
                telegramLink.className = 'btn telegram-btn';
                telegramLink.innerHTML = '<i class="fa-brands fa-telegram"></i> Написать в поддержку';
                telegramLink.style.marginTop = '15px';
                telegramLink.style.display = 'inline-block';
                
                responsePromise.appendChild(telegramLink);
                
                // Разблокировка формы
                contactForm.classList.remove('form-disabled');
            }
        }, 1000);
        
        // Имитация отправки формы
        setTimeout(() => {
            alert('Спасибо! Мы свяжемся с вами в течение 5 минут.');
            this.reset();
            submitButton.disabled = false;
            contactForm.classList.remove('form-disabled');
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

// Обработка кнопок выбора тарифа
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Убираем выделение со всех карточек
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.classList.remove('selected-tariff');
        });
        
        // Добавляем выделение текущей карточке
        const card = this.closest('.pricing-card');
        card.classList.add('selected-tariff');
        
        const tariffName = card.querySelector('h3').textContent;
        const tariffPrice = card.querySelector('.price').textContent;
        
        // Закрываем мобильное меню перед прокруткой
        if (window.innerWidth <= 768) {
            document.querySelector('nav').classList.remove('active');
        }
        
        // Прокрутка к форме контактов
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            // Ждем обновления DOM
            setTimeout(() => {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offset = window.innerWidth <= 768 ? headerHeight : headerHeight + 20;
                
                window.scrollTo({
                    top: contactSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            }, 50);
        }
        
        // Установка фокуса на поле имени
        setTimeout(() => {
            document.querySelector('.contact-form input[type="text"]').focus();
        }, 500);
        
        // Добавление текста в textarea
        const textarea = document.querySelector('.contact-form textarea');
        if (textarea) {
            textarea.value = `Интересует тариф: ${tariffName} (${tariffPrice})`;
        }
        
        // Автоматический выбор Wildberries
        const marketplaceSelect = document.querySelector('.contact-form select');
        if (marketplaceSelect) {
            marketplaceSelect.value = 'wb'; // Значение для Wildberries
        }
        
        // Показываем уведомление
        const notification = document.createElement('div');
        notification.className = 'tariff-notification';
        notification.innerHTML = `Вы выбрали тариф: <strong>${tariffName}</strong>`;
        document.querySelector('.contact .container').prepend(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    });
});