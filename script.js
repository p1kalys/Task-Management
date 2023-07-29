// Get references to HTML elements
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton');

// Add event listeners
taskForm.addEventListener('submit', addTask);
clearButton.addEventListener('click', clearForm);

// Function to add a new task
function addTask(event) {
  event.preventDefault();

  // Get form values
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;
  const status = 'to-do';

  // Create a new task object
  const task = {
    title,
    description,
    dueDate,
    priority,
    status
  };

  // Add the task to the task list
  displayTask(task);

  // Reset the form
  clearForm();
}

// Function to clear the form
function clearForm() {
  taskForm.reset();
}

// Function to display a task in the task list
// Function to display a task in the task list
// Function to display a task in the task list
// Function to display a task in the task list
function displayTask(task) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${task.title}</td>
    <td>${task.description}</td>
    <td>${task.dueDate}</td>
    <td>${task.priority}</td>
    <td>${task.status}</td>
    <td>
      <button onclick="editTask(this)">Edit</button>
      <button onclick="deleteTask(this)">Delete</button>
    </td>
  `;

  // Find the correct position to insert the task based on datewise and priority
  const tasks = taskList.getElementsByTagName('tr');
  let insertIndex = tasks.length;
  for (let i = 0; i < tasks.length; i++) {
    const taskDueDate = new Date(tasks[i].getElementsByTagName('td')[2].textContent);
    const newTaskDueDate = new Date(task.dueDate);
    const taskPriority = tasks[i].getElementsByTagName('td')[3].textContent;

    if (newTaskDueDate.getTime() < taskDueDate.getTime() || (newTaskDueDate.getTime() === taskDueDate.getTime() && getPriorityOrder(taskPriority) > getPriorityOrder(task.priority))) {
      insertIndex = i;
      break;
    }
  }

  taskList.insertBefore(row, tasks[insertIndex]);
}

// Helper function to get priority order (high: 1, medium: 2, low: 3)
function getPriorityOrder(priority) {
  switch (priority) {
    case 'high':
      return 1;
    case 'medium':
      return 2;
    case 'low':
      return 3;
    default:
      return 3;
  }
}


// Function to edit a task
function editTask(button) {
  const row = button.parentNode.parentNode;
  const cells = row.getElementsByTagName('td');
  const title = cells[0].textContent;
  const description = cells[1].textContent;
  const dueDate = cells[2].textContent;
  const priority = cells[3].textContent;

  // Set form values to edit the task
  document.getElementById('title').value = title;
  document.getElementById('description').value = description;
  document.getElementById('dueDate').value = dueDate;
  document.getElementById('priority').value = priority;

  // Remove the task from the task list
  taskList.removeChild(row);
}

// Function to delete a task
function deleteTask(button) {
  const row = button.parentNode.parentNode;
  taskList.removeChild(row);
}
