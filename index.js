document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const totalCountEl = document.getElementById('totalCount');
    const activeCountEl = document.getElementById('activeCount');
    const completedCountEl = document.getElementById('completedCount');
    
    // Состояние приложения
    let tasks = JSON.parse(localStorage.getItem('neon-tasks')) || [];
    let currentFilter = 'all';
    
    // Инициализация
    init();
    
    function init() {
        renderTasks();
        setupEventListeners();
        updateStats();
    }
    
    function setupEventListeners() {
        // Добавление задачи
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
        
        // Фильтрация
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTasks();
            });
        });
        
        // Очистка выполненных
        clearCompletedBtn.addEventListener('click', clearCompleted);
        
        // Делегирование событий для динамических элементов
        taskList.addEventListener('click', handleTaskActions);
    }
    
    function handleTaskActions(e) {
const taskElement = e.target.closest('.task-item');
        if (!taskElement) return;
        
        const taskId = parseInt(taskElement.dataset.id);
        
        // Удаление
        if (e.target.closest('.delete-btn')) {
            deleteTask(taskId);
            return;
        }
        
        // Переключение статуса
        if (e.target.classList.contains('task-checkbox')) {
            toggleTaskStatus(taskId);
        }
    }
    
    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            const newTask = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            tasks.unshift(newTask);
            saveTasks();
            renderTasks();
            updateStats();
            
            // Сброс и анимация
            taskInput.value = '';
            taskInput.focus();
            
            // Анимация добавления
            if (taskList.children.length > 0 && taskList.children[0].classList.contains('task-item')) {
                taskList.children[0].style.animation = 'slideIn 0.4s ease';
            }
        }
    }
    
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
    
    function toggleTaskStatus(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        updateStats();
        
        // Анимация изменения статуса
        const taskElement = document.querySelector(task-item ['data-id=${id}']);
        if (taskElement) {
            taskElement.style.transform = 'scale(1.02)';
            setTimeout(() => {
                taskElement.style.transform = '(300)';
            });
        }
    }
    
    function clearCompleted() {
        // Анимация перед удалением
        document.querySelectorAll('.task-item').forEach(item => {
            if (item.querySelector('.task-checkbox').checked) {
                item.style.transform = 'translateX(-100%)';
                item.style.opacity = '0';
            }
        });
        
        setTimeout(() => {
            tasks = tasks.filter(task => !task.completed);
            saveTasks();
            renderTasks();
            updateStats();
        }, 300);
    }
    
    function saveTasks() {
        localStorage.setItem('neon-tasks', JSON.stringify(tasks));
    }
    
    function renderTasks() {
        if (tasks.length === 0) {
            taskList.innerHTML = 
                <div class="empty-state">
                    <span class="material-icons">inventory_2</span>
                    <p>Пока нет задач</p>
                </div>
            ;
            return;
        }
        
        let tasksToRender = tasks;
        
        // Фильтрация
        if (currentFilter === 'active') {

tasksToRender = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            tasksToRender = tasks.filter(task => task.completed);
        }
        
        if (tasksToRender.length === 0) {
            taskList.innerHTML = 
                <div class="empty-state">
                    <span class="material-icons">search_off</span>
                    <p>Нет задач по выбранному фильтру</p>
                </div>
            ;
            return;
        }
        
        taskList.innerHTML = tasksToRender.map(task => 
            <li class="task-item" data-id="${task.id}">
                <input type="checkbox" class="task-checkbox">${task.completed ? 'checked' : ''}</input> 
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="task-actions">
                    <button class="task-btn delete-btn" title="Удалить">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </li>
        ).join('');
    }
    
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const active = total - completed;
        totalCountEl.textContent = total;
        activeCountEl.textContent = active;
        completedCountEl.textContent = completed;
        
        // Анимация изменения цифр
        [totalCountEl, activeCountEl, completedCountEl].forEach(el => {
            el.style.transform = 'scale(1.2)';
            setTimeout(() => {
                el.style.transform = '';
            }, 300);
        });
    }
});