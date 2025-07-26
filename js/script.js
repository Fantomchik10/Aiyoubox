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
        
        // Прокрутка к форме контактов
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            // Рассчитываем корректный отступ для мобильных устройств
            const headerHeight = document.querySelector('header').offsetHeight;
            const offset = window.innerWidth <= 768 ? headerHeight : headerHeight + 20;
            
            window.scrollTo({
                top: contactSection.offsetTop - offset,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню после клика
            if (window.innerWidth <= 768) {
                document.querySelector('nav').classList.remove('active');
            }
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

// Анимация при скролле
function checkScroll() {
    document.querySelectorAll('.service-step, .value-card, .pricing-card').forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && !el.classList.contains('in-view')) {
            setTimeout(() => {
                el.classList.add('in-view');
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Модальное окно для прайс-листа
document.getElementById('requestPriceBtn').addEventListener('click', function() {
    document.getElementById('priceListModal').style.display = 'block';
    document.getElementById('formStep').style.display = 'block';
    document.getElementById('priceStep').style.display = 'none';
    // Сбрасываем форму
    document.getElementById('priceRequestForm').reset();
});

// Закрытие модального окна
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('priceListModal').style.display = 'none';
});

// Закрытие при клике вне окна
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('priceListModal')) {
        document.getElementById('priceListModal').style.display = 'none';
    }
});

// Валидация телефона
function validatePhone(phone) {
    // Оставляем только цифры
    const cleaned = phone.replace(/\D/g, '');
    
    // Проверяем длину (10 или 11 цифр)
    return cleaned.length === 10 || cleaned.length === 11;
}

// Генерация PDF прайс-листа
function generatePricePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Заголовок
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229);
    doc.text("PackBox — фулфилмент без лишних усилий", 15, 20);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Прайс-лист 2025 | Полный спектр услуг", 15, 27);
    
    // Основные разделы
    const sections = [
        {
            title: "📦 Приёмка и обработка товара",
            services: [
                ["Приёмка товара", "Пересчёт, визуальный осмотр, размещение", "4–12 ₽ / шт."],
                ["Идентификация SKU", "Фото, маркировка, занесение в систему", "30–50 ₽ / SKU"],
                ["Проверка на брак", "Визуальная / детальная / полная", "8-30 руб за шт"],
                ["Сортировка", "По категориям, брендам, цвету", "5 ₽ / шт."],
                ["Отпаривание", "Подготовка одежды", "от 30 ₽ / шт."],
                ["Удаление / замена бирки", "По ТЗ клиента", "3–5 ₽ / шт."],
                ["Вложение флаера / визитки", "Рекламные материалы", "5 ₽ / шт."],
                ["Макет бирки / этикетки", "Дизайн + печать", "от 500 ₽"],
                ["Сканирование QR / Честный Знак", "При поставке", "5 ₽ / шт."]
            ]
        },
        {
            title: "🏠 Хранение",
            services: [
                ["Хранение коробки", "60×40×40 см", "50 ₽ / сутки"],
                ["Хранение паллеты", "1 паллет", "150 ₽ / сутки"],
                ["Хранение до 1 м³", "Адресное размещение", "75–100 ₽ / сутки"],
                ["Хранение штучного товара", "Мелкие позиции", "от 0,9 ₽ / шт. / сутки"],
                ["Бесплатное хранение", "Во время упаковки + 2 дня", "0 ₽"]
            ]
        },
        {
            title: "📦 Упаковка и комплектация",
            services: [
                ["Упаковка в пакет", "Zip-lock, курьерский, БОПП", "5–15 ₽ / шт."],
                ["Упаковка в коробку", "Самосборная / четырёхклапанная", "18–25 ₽ / шт."],
                ["Пупырка + пакет", "Защита хрупких товаров", "15 ₽ / шт."],
                ["Сборка заказа", "Комплектация, проверка, вложения", "9–12 ₽ / заказ"],
                ["Формирование паллеты", "Сборка, упаковка, плёнка", "300 ₽"],
                ["Индивидуальная упаковка", "По размерам", "5–54 ₽ / шт."],
                ["Упаковка в фольгированный дой-пак", "Премиум", "23–50 ₽ / шт."],
                ["Курьерские пакеты", "Разные размеры", "3–21 ₽ / шт."]
            ]
        },
        {
            title: "🏷️ Маркировка и стикеровка",
            services: [
                ["Одинарная маркировка", "Штрихкод, QR", "4–6 ₽ / шт."],
                ["Двойная маркировка", "Доп. стикер, Честный Знак", "7–9 ₽ / шт."],
                ["Доп. наклейка", "По ТЗ клиента", "5 ₽ / шт."],
                ["Сканирование QR", "При поставке", "5 ₽ / шт."],
                ["Макет этикетки", "Дизайн", "100 ₽"],
                ["Печать рекламных материалов", "По запросу", "Индивидуально"]
            ]
        },
        {
            title: "🚚 Отгрузка и доставка",
            services: [
                ["Отгрузка на маркетплейс", "WB, OZON, Яндекс.Маркет", "100–950 ₽ / короб"],
                ["Доставка по Москве", "Забор товара", "1500–2500 ₽"],
                ["Доставка по регионам", "До 1 м³ / до 2 м³", "2700–3200 ₽"],
                ["Отгрузка в Беларусь", "1 паллет", "5000 ₽"],
                ["Забор со СДЭК / рынков", "Садовод, Южные ворота", "от 500–2500 ₽"],
                ["Схема FBS / FBO", "Полный цикл", "от 3150 ₽"]
            ]
        },
        {
            title: "📷 Контент и карточки товара",
            services: [
                ["Фото-контент", "5 предметных фото", "1000 ₽"],
                ["Интерьерная съёмка", "Сценарий, реквизит", "2000 ₽"],
                ["Модельная съёмка", "С участием модели", "2500 ₽"],
                ["Съёмка по ТЗ", "Индивидуальный подход", "3000 ₽"],
                ["Создание карточки", "Описание, загрузка", "500–2000 ₽"],
                ["Дизайн карточки", "Простой / индивидуальный", "500 / 1200 ₽"],
                ["Создание поставки", "В ЛК маркетплейса", "500 ₽"]
            ]
        },
        {
            title: "🔄 Возвраты и рекламации",
            services: [
                ["Приём возврата", "Проверка, фотофиксация", "9–15 ₽ / шт."],
                ["Забор возврата", "Курьером", "от 37 ₽ / шт."],
                ["Утилизация товара", "По ТЗ", "от 50 ₽ / шт."],
                ["Повторная упаковка", "После возврата", "от 15 ₽ / шт."]
            ]
        },
        {
            title: "💻 Интеграции и IT-услуги",
            services: [
                ["Интеграция с CRM / ERP", "API, выгрузки", "от 5000 ₽"],
                ["Ведение ЛК", "Под ключ", "от 10 000 ₽ / мес"],
                ["Настройка рекламы", "Ozon, Яндекс", "от 2000 ₽"],
                ["Продвижение товара", "Внутри маркетплейса", "от 2000 ₽"],
                ["Аналитика и отчётность", "Остатки, выкупы, чек", "от 1500 ₽ / мес"]
            ]
        }
    ];

    let yPos = 40;
    
    sections.forEach(section => {
        // Заголовок раздела
        doc.setFontSize(14);
        doc.setTextColor(40);
        doc.text(section.title, 15, yPos);
        yPos += 8;
        
        // Таблица услуг
        doc.autoTable({
            startY: yPos,
            head: [['Услуга', 'Описание', 'Цена']],
            body: section.services,
            theme: 'grid',
            headStyles: { 
                fillColor: [79, 70, 229],
                textColor: 255,
                fontStyle: 'bold'
            },
            styles: { fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 45 },
                1: { cellWidth: 85 },
                2: { cellWidth: 30 }
            }
        });
        
        yPos = doc.autoTable.previous.finalY + 15;
    });
    
    // Специальные условия
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text("🎁 Специальные условия для новых клиентов", 15, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.text("- Скидка 20% на обработку заказов в первый месяц", 20, yPos);
    
    // Сохранение PDF
    doc.save('aiyoubox-price-list-2025.pdf');
}

// Обработка формы запроса прайса
document.getElementById('priceRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userName = document.getElementById('userName').value;
    const userPhone = document.getElementById('userPhone').value;
    
    // Валидация телефона
    const phoneDigits = userPhone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        alert('Пожалуйста, введите корректный номер телефона (10 или 11 цифр)');
        return;
    }
    
    // Показываем прайс-лист
    document.getElementById('formStep').style.display = 'none';
    document.getElementById('priceStep').style.display = 'block';
});

// Кнопка скачивания PDF
document.getElementById('downloadPdfBtn').addEventListener('click', function() {
    generatePricePDF();
});