let tasks = [];

const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
};

const completedCount = () => {
    const completedCount = tasks.filter(task => task.checked).length;
    document.getElementById('completed-count').textContent = `${completedCount} tarefa(s) concluída(s)`;
};

const getCheckboxInput = ({ id, taskName, label, checked, createdAt }) => {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'task-div';
    
    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info-div';

    const taskNameDiv = document.createElement('div');
    taskNameDiv.className = 'task-name-div';

    const taskLabelDateDiv = document.createElement('div');
    taskLabelDateDiv.className = 'task-label-date-div'; 

    const taskNameElement = document.createElement('span');
    taskNameElement.textContent = taskName;
    taskNameElement.className = 'task-name'

    const labelElement = document.createElement('span');
    labelElement.className = 'task-label';
    labelElement.textContent = label;

    const createdAtElement = document.createElement('span');
    createdAtElement.className = 'task-date';
    createdAtElement.textContent = `Criado em: ${createdAt}`;

    const completeButton = document.createElement('button');
    completeButton.className = 'complete-button';
    completeButton.textContent = checked ? '✔' : 'Concluir';
    completeButton.onclick = () => {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, checked: !task.checked } : task
        );
        saveTasksToLocalStorage();
        renderTasks();
    };

    taskInfo.appendChild(taskNameElement);
    taskInfo.appendChild(labelElement);
    taskInfo.appendChild(createdAtElement);
    taskInfo.appendChild(taskNameDiv);
    taskInfo.appendChild(taskLabelDateDiv);

    taskNameDiv.appendChild(taskNameElement);

    taskLabelDateDiv.appendChild(labelElement);
    taskLabelDateDiv.appendChild(createdAtElement)

    mainDiv.appendChild(taskInfo);
    mainDiv.appendChild(completeButton);

    if (checked) {
        taskNameElement.style.textDecoration = 'line-through';
        completeButton.disabled = true;
        mainDiv.classList.add('task-completed')
    }

    return mainDiv;
};

const renderTasks = () => {
    const list = document.getElementById('item-list');
    list.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = getCheckboxInput(task);
        const listItem = document.createElement('li');
        listItem.appendChild(taskItem);
        list.appendChild(listItem);
    });
    completedCount();
};

document.getElementById('save-task').onclick = (event) => {
    event.preventDefault();

    const taskName = document.getElementById('nomeDaTarefa').value.trim();
    const taskLabel = document.getElementById('etiqueta').value.trim();
    
    if (taskName && taskLabel) {
        const newTask = {
            id: tasks.length + 1,
            taskName,
            label: taskLabel,
            checked: false,
            createdAt: new Date().toLocaleDateString('pt-BR'),
        };
        tasks.push(newTask);
        saveTasksToLocalStorage();
        renderTasks();
        document.getElementById('nomeDaTarefa').value = '';
        document.getElementById('etiqueta').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
};

document.getElementById('remove-completed').onclick = () => {
    tasks = tasks.filter(task => !task.checked); 
    saveTasksToLocalStorage(); 
    renderTasks(); 
};

window.onload = () => {
    loadTasksFromLocalStorage();
    renderTasks();
};