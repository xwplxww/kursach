document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('authForm');
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');
    
    if (!authForm, !passwordToggle,  !passwordInput) {
        console.error('Не найдены необходимые элементы!');
        return;
    }

    passwordToggle.addEventListener('click', function() {
        
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        const icon = passwordToggle.querySelector('.material-icons');
        if (icon) {
            icon.textContent = isPassword ? 'visibility_off' : 'visibility';
        }
        
        passwordToggle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            passwordToggle.style.transform = 'scale(1)';
        }, 200);
    });

    authForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value.trim();
        const remember = document.getElementById('remember').checked;
        
        if (!username || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        console.log('Отправка данных:', {
            username: username,
            password: password,
            remember: remember
        });
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });

    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Функция восстановления пароля в разработке');
        });
    }
});