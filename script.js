document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('authForm');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    const particles = document.querySelector('.particles');

    // Показать/скрыть пароль
    passwordToggle.addEventListener('click', function() {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggle.innerHTML = isPassword ? 
            '<span class="material-icons">visibility_off</span>' : 
            '<span class="material-icons">visibility</span>';
    });

    // Создание дополнительных частиц
    function createParticles() {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Случайные параметры
            const size = Math.random() * 60 + 40;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * -20;
            
            particle.style.width = ${size}px;
            particle.style.height = ${size}px;
            particle.style.top = ${posY}%;
            particle.style.left = ${posX}%;
            particle.style.animationDuration = ${duration}s;
            particle.style.animationDelay = ${delay}s;
            
            particles.appendChild(particle);
        }
    }

    // Обработка формы
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;
        
        // Анимация загрузки
        const authBtn = document.querySelector('.auth-btn');
        authBtn.innerHTML = '<span>Авторизация...</span>';
        authBtn.disabled = true;
        
        // Имитация запроса
        setTimeout(() => {
            console.log('Авторизация:', { username, password, remember });
            
            // Успешная авторизация
            authBtn.innerHTML = '<span>Успешно!</span>';
            authBtn.style.background = 'linear-gradient(135deg, #00e676, #00c853)';
            
            setTimeout(() => {
                alert(Добро пожаловать, ${username}!);
                authBtn.innerHTML = '<span>Войти</span>';
                authBtn.style.background = 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))';
                authBtn.disabled = false;
            }, 1000);
            
        }, 1500);
    });

    // Создаем частицы при загрузке
    createParticles();

    // Анимация ввода
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('.input-icon').style.color = 'var(--neon-pink)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('.input-icon').style.color = 'var(--neon-blue)';
        });
    });
});