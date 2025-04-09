document.addEventListener('DOMContentLoaded', function() {
    initFields();
    
    document.getElementById('registerBtn').addEventListener('click', submitForm);
});

function initFields() {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.parentNode.querySelector('label');
            if (label) {
                label.style.color = getComputedStyle(document.documentElement)
                    .getPropertyValue('--neon-pink').trim();
            }
        });
        
        input.addEventListener('blur', function() {
            const label = this.parentNode.querySelector('label');
            if (label && !this.value) {
                label.style.color = getComputedStyle(document.documentElement)
                    .getPropertyValue('--text-color').trim();
            }
        });
    });
}

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const toggles = document.querySelectorAll('.password-toggle');
    let currentToggle = null;
    
    toggles.forEach(toggle => {
        if (toggle.previousElementSibling && 
            toggle.previousElementSibling.previousElementSibling === field) {
            currentToggle = toggle;
        }
    });
    
    if (!currentToggle) return;
    
    if (field.type === 'password') {
        field.type = 'text';
        currentToggle.textContent = 'Скрыть';
    } else {
        field.type = 'password';
        currentToggle.textContent = 'Показать';
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function submitForm() {
    document.querySelectorAll('.error-message').forEach(el => {
        if (el.id !== 'passwordError') {
            el.remove();
        }
    });
    
    const username = document.getElementById('usernameField').value.trim();
    const email = document.getElementById('emailField').value.trim();
    const password = document.getElementById('passwordField').value.trim();
    const confirmPassword = document.getElementById('confirmPasswordField').value.trim();
    const passwordError = document.getElementById('passwordError');
    
    passwordError.textContent = '';

    if (!username) {
        showError('usernameField', 'Введите имя пользователя');
        return false;
    }
    
    if (!email) {
        showError('emailField', 'Введите email');
        return false;
    } else if (!validateEmail(email)) {
        showError('emailField', 'Некорректный email');
        return false;
    }
    
    if (!password) {
        showError('passwordField', 'Введите пароль');
        return false;
    } else if (password.length < 6) {
        showError('passwordField', 'Пароль должен быть не менее 6 символов');
        return false;
    }
    
    if (password !== confirmPassword) {
        passwordError.textContent = 'Пароли не совпадают';
        document.getElementById('confirmPasswordField').focus();
        return false;
    }
    
    const formData = {
        username: username,
        email: email,
        password: password
    };
    
    console.log('Данные формы:', formData);
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
    
    return true;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const oldError = field.parentNode.querySelector('.error-message:not(#passwordError)');
    if (oldError) {
        oldError.remove();
    }
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
    field.focus();
    
    field.style.borderColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--error-color').trim();
    
    field.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--neon-purple').trim();
            const error = this.parentNode.querySelector('.error-message:not(#passwordError)');
            if (error) error.remove();
        }
    }, { once: true });
}
