document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');
    
    // Валидация пароля в реальном времени
    confirmPassword.addEventListener('input', function() {
        if (password.value !== confirmPassword.value) {
            passwordError.textContent = 'Пароли не совпадают!';
            passwordError.style.display = 'block';
            confirmPassword.style.borderBottomColor = '#f55';
        } else {
            passwordError.style.display = 'none';
            confirmPassword.style.borderBottomColor = '#0ff';
        }
    });
    
    // Проверка минимальной длины пароля
    password.addEventListener('input', function() {
        if (this.value.length > 0 && this.value.length < 6) {
            passwordError.textContent = 'Пароль слишком короткий!';
            passwordError.style.display = 'block';
            password.style.borderBottomColor = '#f55';
        } else {
            passwordError.style.display = 'none';
            password.style.borderBottomColor = '#0ff';
        }
    });
    
    // Обработка формы регистрации
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверка валидности формы
        if (!form.checkValidity()) {
            alert('Пожалуйста, заполните все поля корректно!');
            return;
        }
        
        if (password.value !== confirmPassword.value) {
            passwordError.textContent = 'Пароли не совпадают!';
            passwordError.style.display = 'block';
            password.focus();
            return;
        }
        
        if (password.value.length < 6) {
            passwordError.textContent = 'Пароль должен содержать минимум 6 символов!';
            passwordError.style.display = 'block';
            password.focus();
            return;
        }
        
        // Имитация успешной регистрации
        simulateRegistration();
    });
    
    function simulateRegistration() {
        const neonSign = document.querySelector('.neon-sign');
        const originalText = neonSign.textContent;
        const originalShadow = neonSign.style.textShadow;
        
        // Анимация успешной регистрации
        neonSign.textContent = 'Регистрация успешна!';
        neonSign.style.textShadow = '0 0 10px #0f0, 0 0 20px #0f0, 0 0 40px #0f0';
        
        // Сброс формы через 3 секунды
        setTimeout(() => {
            form.reset();
            neonSign.textContent = originalText;
            neonSign.style.textShadow = originalShadow;
            
            // Сброс стилей полей ввода
            document.querySelectorAll('input').forEach(input => {
                input.style.borderBottomColor = '';
            });
            passwordError.style.display = 'none';
        }, 3000);
    }
    
    // Остальной код (анимации и т.д.) остается без изменений
    // ...
});