let radioName = 1;

class TodoList {
  constructor(name) {
    this.element = document.querySelector('.todo-list');
    this.uncheckedTodo = [];
    this.checkedTodo = [];

    const list = document.createElement('div');
    list.innerHTML = name;
    list.className = 'active';
    document.querySelector('.lists').appendChild(list);

    this.todoCreator = document.querySelector('.todo-creator');
    this.todoCreator.innerHTML =
        document.querySelector('.todo-creator-template').innerHTML;

    // set the same name to avoid multiple choice
    this.todoCreator.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.name = 0;
    });

    this.addEvent();
  }

  // create a new todo
  addTodo(inputName, inputPriority, inputTag, inputChecked) {
    const newTodo = new Todo(inputName, inputPriority, inputTag, inputChecked);

    newTodo.deleteButtonEle.addEventListener('click', () => {
      if(newTodo.checked) {
        this.checkedTodo.splice(this.checkedTodo.indexOf(newTodo), 1);
      }
      else {
        this.uncheckedTodo.splice(this.uncheckedTodo.indexOf(newTodo), 1);
      }
      newTodo.element.remove();

      this.update()
    })

    // toggle todoCheckbox
    newTodo.todoCheckboxEle.addEventListener('click', () => {
      newTodo.checked = !newTodo.checked;

      if(newTodo.checked) {
        // move the todo from unchecked to checked
        this.uncheckedTodo.splice(
          this.uncheckedTodo.indexOf(newTodo), 1);
        this.checkedTodo.push(newTodo);
      }
      else {
        // move the todo from checked to unchecked
        this.checkedTodo.splice(
          this.checkedTodo.indexOf(newTodo), 1);
        this.uncheckedTodo.push(newTodo);
      }

      newTodo.update();
      this.update();
    });

    this.update();

    return newTodo;
  }

  addEvent() {
    // expand the todoCreator
    const inputName = document.querySelector('.input-name');
    inputName.addEventListener('focus', () => {
      this.todoCreator.style.maxHeight = '210px';
    })

    // shrink the todoCreator
    document.addEventListener('click', (event) => {
      const inputName = document.querySelector('.input-name');
      if(event.target != inputName && !this.todoCreator.contains(event.target)) {
        this.todoCreator.style.maxHeight = '50px';
      }
    })

    // create a new todo when press Enter
    this.todoCreator.addEventListener('keydown', (event) => {
      const inputName = document.querySelector('.input-name');
      if(event.code=='Enter' && inputName.value!='') {
        const inputPriority =
        this.todoCreator.querySelector('input[type="radio"]:checked');
        const inputTag = this.todoCreator.querySelector('.todo-creator-tag');

        const newTodo = this.addTodo(inputName.value,
            inputPriority.className, inputTag.value, false);
        this.uncheckedTodo.push(newTodo);

        // set the default value after adding a new todo
        inputName.value = '';
        this.todoCreator.querySelector('.low').checked = true;
        inputTag.value = '';

        this.update();
        this.display();
      }
    });

    // add click events for sort buttons
    document.querySelector('.sort-name').addEventListener('click', () => {
      this.uncheckedTodo.sort(sortWithName);
      this.update();
    })

    document.querySelector('.sort-priority').addEventListener('click', () => {
      this.uncheckedTodo.sort(sortWithPriority);
      this.update();
    })

    document.querySelector('.sort-tag').addEventListener('click', () => {
      this.uncheckedTodo.sort(sortWithTag);
      this.update();
    })
  }

  // update the todo list
  update() {
    this.checkedTodo.forEach((todo) => {
      this.element.insertBefore(todo.element, this.todoCreator.nextSibling);
    });
    this.uncheckedTodo.forEach((todo) => {
      this.element.insertBefore(todo.element, this.todoCreator.nextSibling);
    });

    localStorage.setItem('todoList1', JSON.stringify(this));
  }

  // display the todo list
  display() {
    this.uncheckedTodo.forEach((todo) =>
      this.element.insertBefore(todo.element, this.todoCreator.nextSibling));
  }
}

class Todo {
  constructor(todoName, priority, todoTag, checked) {
    this.todoName = todoName;
    this.checked = checked;
    this.priority = priority;
    this.todoTag = todoTag;

    // create todo
    this.element = document.createElement('div');
    this.element.className = 'todo';
    this.element.innerHTML = document.querySelector('.todo-template').innerHTML;

    this.todoNameEle = this.element.querySelector('.todo-name');
    this.todoNameEle.value = todoName;

    this.todoTagEle = this.element.querySelector('.todo-tag');
    this.todoTagEle.value = '#' + todoTag;
    
    this.todoCheckboxEle = this.element.querySelector('.todo-checkbox');

    this.deleteButtonEle = this.element.querySelector('.delete-button');

    // update priority
    this.element.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.name = radioName;
    });
    radioName++;

    this.element.querySelector(`.${priority}`).checked = true;

    this.svg = this.element.querySelector('svg');

    this.update();
    this.addEvent();
  }

  update() {
    this.todoName = this.todoNameEle.value;
    this.todoTag = this.todoTagEle.value.substring(1);
    this.element.querySelectorAll('input[type="radio"]').forEach(radio => {
      if(radio.checked) {
        this.priority = radio.className;
      }
    });

    this.todoCheckboxEle.setAttribute('checked', this.checked);
    this.svg.setAttribute('checked', this.checked);
    this.todoNameEle.setAttribute('checked', this.checked);

    // set checkbox color according to priority
    if(this.priority == 'high') {
      this.todoCheckboxEle.style.borderColor = '#fbcb08';
      this.todoCheckboxEle.style.setProperty('--checkbox-background', '#fbcb08');
    }
    else if(this.priority == 'mid') {
      this.todoCheckboxEle.style.borderColor = '#ffffda';
      this.todoCheckboxEle.style.setProperty('--checkbox-background', '#ffffda');
    }
    else {
      this.todoCheckboxEle.style.borderColor = '#a2a2a2';
      this.todoCheckboxEle.style.setProperty('--checkbox-background', '#a2a2a2');
    }

    localStorage.setItem('todoList1', JSON.stringify(todoList1));
  }

  addEvent() {
    // expand todo
    this.element.addEventListener('click', (event) => {
      if(event.target != this.todoCheckboxEle) {
        this.element.style.maxHeight = '140px';
        this.element.style.padding = '15px';
        this.todoNameEle.style.pointerEvents = 'auto'; 
        this.todoTagEle.style.pointerEvents = 'auto'; 
      }
    });

    // shrink todo
    document.addEventListener('click', (event) => {
      if(event.target != this.element &&
        !this.element.contains(event.target)) {
        this.element.style.maxHeight = '50px';
        this.element.style.padding = '10px';
        this.todoNameEle.style.pointerEvents = 'none'; 
        this.todoTagEle.style.pointerEvents = 'none'; 

        this.update();
      }
    });
  }
}

function sortWithName(todoa, todob) {
  return todob.todoName.localeCompare(todoa.todoName);
}

const priorityToNum = { 'high': 3, 'mid': 2, 'low': 1 }
function sortWithPriority(todoa, todob) {
  // if priority are same, sort with name
  if(todoa.priority == todob.priority) {
    return sortWithName(todoa, todob);
  }
  else {
    return priorityToNum[todoa.priority] - priorityToNum[todob.priority];
  }
}

function sortWithTag(todoa, todob) {
  // if tags are same, sort with priority
  if(todoa.todoTag == todob.todoTag) {
    sortWithPriority(todoa, todob);
  }
  else {
    return todob.todoTag.localeCompare(todoa.todoTag);
  }
}

// set greeting message
const date = new Date();
const hour = date.getHours;

if(hour>=6 && hour<12) {
  document.querySelector('.greet-message').innerHTML = 'Good Morning.';
}
else if(hour>=12 && hour<17) {
  document.querySelector('.greet-message').innerHTML = 'Good Afternoon.';
}
else {
  document.querySelector('.greet-message').innerHTML = 'Good Evening.';
}

const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
document.querySelector('.date').innerHTML =
    monthName[date.getMonth()] + '<br>' + date.getDate();

// localStorage.clear();
const todoList1 = new TodoList('Today');

if(localStorage.getItem('todoList1')) {
  tmp = JSON.parse(localStorage.getItem('todoList1'));

  tmp.uncheckedTodo.forEach(todo => {
    todoList1.uncheckedTodo.push(todoList1.addTodo(
      todo.todoName, todo.priority, todo.todoTag, false
    ));
  })
  tmp.checkedTodo.forEach(todo => {
    todoList1.checkedTodo.push(todoList1.addTodo(
      todo.todoName, todo.priority, todo.todoTag, true
    ));
  })
}

todoList1.update();
todoList1.display();

// const todoList2 = new TodoList('TodoList2');
// todoList2.display();
