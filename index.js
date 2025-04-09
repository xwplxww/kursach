document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.querySelector('.task-input');
    const addBtn = document.querySelector('.add-btn');
    const taskList = document.querySelector('.task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const totalTasksSpan = document.querySelector('.total-tasks');
    const completedTasksSpan = document.querySelector('.completed-tasks');
    let tasks = JSON.parse(localStorage.getItem('neon-tasks')) || [];
    let currentFilter = 'all';
    renderTasks();
    updateStats();
    
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderTasks();
        });
    });
    
    clearBtn.addEventListener('click', clearCompleted);
    
    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            const newTask = {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            tasks.push(newTask);
            saveTasks();
            taskInput.value = '';
            renderTasks();
            updateStats();
            
            const items = document.querySelectorAll('.task-item');
            if (items.length > 0) {
                const lastItem = items[items.length - 1];
                lastItem.style.transform = 'scale(1.05)';
                lastItem.style.boxShadow = '0 0 20px var(--neon-green)';
                setTimeout(() => {
                    lastItem.style.transform = '';
                    lastItem.style.boxShadow = '';
                }, 500);
            }
        }
    }
    
    function renderTasks() {
        taskList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<div class="no-tasks">Нет задач для отображения</div>';
            return;
        }
        
        filteredTasks.sort((a, b) => {
            if (a.completed && !b.completed) return 1;
            if (!a.completed && b.completed) return -1;
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
        
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.dataset.id = task.id;
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="edit-btn">Изменить</button>
                    <button class="delete-btn">Удалить</button>
                </div>
            `;
            
            taskList.appendChild(taskItem);
            
            const checkbox = taskItem.querySelector('.task-checkbox');
            const editBtn = taskItem.querySelector('.edit-btn');
            const deleteBtn = taskItem.querySelector('.delete-btn');
            const taskText = taskItem.querySelector('.task-text');
            
            checkbox.addEventListener('change', function() {
                toggleTaskComplete(task.id);
            });
            
            deleteBtn.addEventListener('click', function() {
                taskItem.style.transform = 'translateX(100%)';
                taskItem.style.opacity = '0';
                setTimeout(() => {
                    deleteTask(task.id);
                }, 300);
            });
            
            editBtn.addEventListener('click', function() {
                editTask(task.id, taskText);
            });
        });
    }
    
    function toggleTaskComplete(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasks();
        renderTasks();
        updateStats();
        
        const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
        if (taskItem) {
            taskItem.style.boxShadow = `0 0 20px ${taskItem.classList.contains('completed') ? 'var(--neon-blue)' : 'var(--neon-green)'}`;
            setTimeout(() => {
                taskItem.style.boxShadow = '';
            }, 1000);
        }
    }
    
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
    
    function editTask(id, taskTextElement) {
        const task = tasks.find(task => task.id === id);
        if (!task) return;
        
        const currentText = task.text;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'task-input';
        input.style.margin = '0';
        input.style.width = '100%';
        
        taskTextElement.replaceWith(input);
        input.focus();
        
        function saveEdit() {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                tasks = tasks.map(t => 
                    t.id === id ? { ...t, text: newText } : t
                );
                saveTasks();
                
                const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
                if (taskItem) {
                    taskItem.style.boxShadow = '0 0 20px var(--neon-yellow)';
                    setTimeout(() => {
                        taskItem.style.boxShadow = '';
                    }, 1000);
                }
            }
            renderTasks();
        }
        
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') saveEdit();
        });
    }
    
    function clearCompleted() {
        if (tasks.some(task => task.completed)) {
    
            document.querySelectorAll('.task-item.completed').forEach(item => {
                item.style.transform = 'scale(0.9)';
                item.style.opacity = '0';
            });
            
            setTimeout(() => {
                tasks = tasks.filter(task => !task.completed);
                saveTasks();
                renderTasks();
                updateStats();
            }, 300);
        }
    }
    
    function updateStats() {
        totalTasksSpan.textContent = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        completedTasksSpan.textContent = completed;
        
        totalTasksSpan.style.transform = 'scale(1.2)';
        completedTasksSpan.style.transform = 'scale(1.2)';
        setTimeout(() => {
            totalTasksSpan.style.transform = '';
            completedTasksSpan.style.transform = '';
        }, 300);
    }
    
    function saveTasks() {
        localStorage.setItem('neon-tasks', JSON.stringify(tasks));
    }
});