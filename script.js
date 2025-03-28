document.addEventListener('DOMContentLoaded', function() {
    // 1. Получаем элементы правильно
    const authForm = document.getElementById('authForm');
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');
    
    // 2. Проверяем, что элементы существуют
    if (!authForm, !passwordToggle,  !passwordInput) {
        console.error('Не найдены необходимые элементы!');
        return;
    }

    // 3. Обработчик переключения видимости пароля
    passwordToggle.addEventListener('click', function() {
        // Переключаем тип поля ввода
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        // Меняем иконку
        const icon = passwordToggle.querySelector('.material-icons');
        if (icon) {
            icon.textContent = isPassword ? 'visibility_off' : 'visibility';
        }
        
        // Анимация
        passwordToggle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            passwordToggle.style.transform = 'scale(1)';
        }, 200);
    });

    // 4. Обработчик отправки формы
    authForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Важно: предотвращаем перезагрузку страницы
        
        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value.trim();
        const remember = document.getElementById('remember').checked;
        
        // Валидация
        if (!username || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Имитация авторизации
        console.log('Отправка данных:', {
            username: username,
            password: password,
            remember: remember
        });
        
        // Перенаправление после "успешной" авторизации
        setTimeout(() => {
            window.location.href = 'http://127.0.0.1:5500/indexx.html'; // Замените на ваш URL
        }, 1000);
    });

    // 5. Обработчик для кнопки "Забыли пароль?"
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Функция восстановления пароля в разработке');
        });
    }

    // 6. Обработчик для кнопки "Регистрация"
    setTimeout(() => {
        window.location.href = 'http://127.0.0.1:5500/scriptt.html#'; // Замените на ваш URL
    }, 1000);
});
});