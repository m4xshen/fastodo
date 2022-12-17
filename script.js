const todolist = document.getElementById('todolist');
let id = 1;

class Todo {
  constructor(content, priority, tag) {
    this.priority = priority;

    // create todo
    this.element = document.createElement('div');
    this.element.className = 'todo';
    this.element.innerHTML =
      document.getElementById('todo-title-template').innerHTML +
      document.getElementById('todo-info-template').innerHTML;

    this.content = this.element.querySelector('.content');
    this.content.value = content;
    this.content.setAttribute('checked', 'false');

    this.element.querySelector('.tag').value = tag;

    // set checkbox color according to priority
    this.checkbox = this.element.querySelector('.checkbox');

    this.element.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.name = id;
      radio.addEventListener('change', (event) => {
        this.priority = event.target.className;
        this.update();
      })
    });
    id++;

    this.element.querySelector(`.${priority}`).checked = true;

    this.svg = this.element.querySelector('svg');

    this.update();
    this.addEvent();
  }

  update() {
    if(this.priority == 'high') {
      this.checkbox.style.borderColor = '#f38ba8';
      this.checkbox.style.setProperty('--checkbox-background', '#f38ba8');
    }
    else if(this.priority == 'mid') {
      this.checkbox.style.borderColor = '#f9e2af';
      this.checkbox.style.setProperty('--checkbox-background', '#f9e2af');
    }
    else {
      this.checkbox.style.borderColor = '#a2a2a2';
      this.checkbox.style.setProperty('--checkbox-background', '#a2a2a2');
    }
  }

  addEvent() {
    // expand todo
    this.element.addEventListener('click', (event) => {
      if(event.target != this.checkbox) {
        this.element.style.maxHeight = '210px';
        this.content.style.pointerEvents = 'auto'; 
      }
    });

    // shrink todo
    document.addEventListener('click', (event) => {
      if(event.target != this.element &&
        !this.element.contains(event.target)) {
        this.element.style.maxHeight = '50px';
        this.content.style.pointerEvents = 'none'; 
      }
    });

    // toggle checkbox
    this.checkbox.addEventListener('click', () => {
      if(this.checkbox.getAttribute('checked') == 'false') {
        this.checkbox.setAttribute('checked', 'true');
        this.svg.setAttribute('checked', 'true');
        this.content.setAttribute('checked', 'true');

        uncheckedTodo.splice(uncheckedTodo.indexOf(this), 1);
        checkedTodo.push(this);
      }
      else {
        this.checkbox.setAttribute('checked', 'false');
        this.svg.setAttribute('checked', 'false');
        this.content.setAttribute('checked', 'false');

        checkedTodo.splice(checkedTodo.indexOf(this), 1);
        uncheckedTodo.push(this);
      }

      update();
    });
  }
}

const uncheckedTodo = [];
const checkedTodo = [];

// update the todo list
function update() {
  checkedTodo.forEach((todo) => {
    todolist.insertBefore(todo.element, newtodo.nextSibling);
  });
  uncheckedTodo.forEach((todo) => {
    todolist.insertBefore(todo.element, newtodo.nextSibling);
  });
}

const newtodo = document.getElementById('newtodo');
newtodo.innerHTML += document.getElementById('todo-info-template').innerHTML;
newtodo.querySelector('.low').checked = true;

// set the same name to avoid multiple choice
newtodo.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.name = 0;
});

const content = document.getElementById('content');

// expand the newtodo
content.addEventListener('focus', () => {
  newtodo.style.maxHeight = '210px';
})

// shrink the newtodo
document.addEventListener('click', (event) => {
  if(event.target != content && !newtodo.contains(event.target)) {
    newtodo.style.maxHeight = '50px';
  }
})

// add a new todo when press Enter
newtodo.addEventListener('keydown', (event) => {
  if(event.code=='Enter' && content.value!='') {
    const priority = newtodo.querySelector('input[type="radio"]:checked');
    const tag = newtodo.querySelector('.tag');

    // add a new todo
    console.log(tag.value);
    uncheckedTodo.push(new Todo(content.value, priority.className, tag.value));

    // reset the value after adding a new todo
    content.value = '';
    priority.checked = false;
    newtodo.querySelector('.low').checked = true;
    tag.value = '';

    uncheckedTodo.forEach((todo) =>
      todolist.insertBefore(todo.element, newtodo.nextSibling));
  }
});
