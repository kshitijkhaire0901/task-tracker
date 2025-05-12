const taskInput = document.getElementById('task-input');
const  addBtn =  document.getElementById('add-btn');
const taskList =  document.getElementById('task-list');

//Load tasks from the localstorage on page load
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

// Add task on button click
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTaskToDOM(taskText);
    saveTask(taskText);
    taskInput.value = '';
  }
});

// Add task to the DOM
function addTaskToDOM(text, completed = false) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;

  const time = document.createElement('small');
const createdAt = new Date().toLocaleString();
time.textContent = ` Added: ${createdAt}`;
time.classList.add('timestamp');

span.appendChild(time);

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✅';
  doneBtn.onclick = () => {
    li.classList.toggle('completed');
    updateStorage();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.onclick = () => {
  li.classList.add('removing');
  setTimeout(() => {
    taskList.removeChild(li);
    updateStorage();
  }, 300); // Matches the CSS transition duration
};

const filterButtons = document.querySelectorAll('.filters button');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active')); // remove from all
    button.classList.add('active'); // add to clicked
    const filter = button.getAttribute('data-filter');
    filterTasks(filter);
  });
});
  
function filterTasks(filter) {
  const allTasks = document.querySelectorAll('.task-item');

  allTasks.forEach(task => {
    const isCompleted = task.classList.contains('completed');

    if (filter === 'all') {
      task.style.display = 'flex';
    } else if (filter === 'active') {
      task.style.display = isCompleted ? 'none' : 'flex';
    } else if (filter === 'completed') {
      task.style.display = isCompleted ? 'flex' : 'none';
    }
  });
}



  actions.appendChild(doneBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);

  function addTaskToDOM(text, completed = false, createdAt = null) {
  const time = document.createElement('small');
  time.textContent = `Added: ${createdAt || new Date().toLocaleString()}`;
}

}

// Save task to localStorage
function saveTask(text) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed: false, createdAt: new Date().toLocaleString() });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task completion/deletion in localStorage
function updateStorage() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(item => {
    tasks.push({
      text: item.querySelector('span').textContent,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}