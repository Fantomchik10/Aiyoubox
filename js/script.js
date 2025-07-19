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
        }
    });
});

// Обработка формы
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь должна быть логика отправки данных
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}