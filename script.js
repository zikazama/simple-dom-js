const form = document.querySelector("#todoForm");
let todoData = [];

// Create
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoInput = document.querySelector("#todoInput");
  const todoText = todoInput.value.trim();
  if (todoText) {
    todoData.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todoData));
    todoInput.value = "";
    showTodoList();
  } else {
    alert("Please enter a todo item.");
  }
});

// Read
const showTodoList = () => {
  const todoList = document.querySelector("#todoList");
  todoList.innerHTML = "";
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todoData = [];
    todoData.push(...JSON.parse(storedTodos));
  }
  todoData.forEach((todo, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-index", index);
    li.setAttribute("style", "margin: 10px;");
    li.textContent = todo;
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.setAttribute(
      "style",
      "margin-left: 10px; background-color: yellow; "
    );
    editButton.addEventListener("click", () => updateTodo(index));
    li.appendChild(editButton);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute(
      "style",
      "margin-left: 10px; background-color: red; color: white;"
    );
    deleteButton.addEventListener("click", () => deleteTodo(index));
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
};

// Update
const updateTodo = (index) => {
  const newTodo = prompt("Edit todo:", todoData[index]);
  if (newTodo) {
    todoData[index] = newTodo;
    localStorage.setItem("todos", JSON.stringify(todoData));
    showTodoList();
  }
};

// Delete
const deleteTodo = (index) => {
  todoData.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todoData));
  showTodoList();
};

showTodoList();