const todolist = document.getElementById('todolist');

class Todo {
  constructor(content, tag) {
    this.checked = false;
    this.content = content;
    this.tag = tag;

    this.element = document.createElement('div');
    this.element.className = 'todo';

    this. checkboxElement = document.createElement('button');
    this.checkboxElement.className = 'checkbox'
    this.checkboxElement.setAttribute('checked', 'false');
    this.element.appendChild(this.checkboxElement);

    const contentElement = document.createElement('div');
    contentElement.className = 'content'
    contentElement.innerHTML = content;
    this.element.appendChild(contentElement);
  }

  update() {
    todolist.appendChild(this.element);
  }
}

const todos = [];

function update() {
  todos.forEach((todo) => {
    todo.checkboxElement.onclick = function() {
      if(todo.checkboxElement.getAttribute('checked') == 'true') {
        todo.checkboxElement.setAttribute('checked', 'false');
      }
      else {
        todo.checkboxElement.setAttribute('checked', 'true');
      }

      todos.push(todos.splice(todos.indexOf(todo), 1)[0]);

      todolist.innerHTML = '';
      todos.forEach((todo) => todo.update());
    }
  });
  todos.forEach((todo) => todo.update());
}

const newtodo = document.getElementById('newtodo');
newtodo.addEventListener('keydown', (event) => {
  if(event.code=='Enter' && newtodo.value!='') {
    todos.unshift(new Todo(newtodo.value));
    newtodo.value = '';
    update();
  }
});
