let radioName = 1;

class TodoList {
  constructor() {
    this.element = document.querySelector('.todo-list');
    this.uncheckedTodo = [];
    this.checkedTodo = [];

    this.todoCreator = document.querySelector('.todo-creator');
    this.todoCreator.innerHTML =
        document.querySelector('.todo-creator-template').innerHTML;

    // set the same name to avoid multiple choice
    this.todoCreator.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.name = 0;
    });

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
        const priority =
            this.todoCreator.querySelector('input[type="radio"]:checked');
        const todoTag = this.todoCreator.querySelector('.todo-creator-tag');

        // create a new todo
        this.uncheckedTodo.push(new Todo(
            inputName.value, priority.className, todoTag.value, todoList1));

        // set the default value after adding a new todo
        inputName.value = '';
        this.todoCreator.querySelector('.low').checked = true;
        todoTag.value = '';

        this.update();
      }
    });

    // add sort event
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
  }

  // display the todo list
  display() {
    this.uncheckedTodo.forEach((todo) =>
      this.element.insertBefore(todo.element, this.todoCreator.nextSibling));
  }
}

class Todo {
  constructor(todoName, priority, todoTag, todoList) {
    this.todoList = todoList;
    this.priority = priority;

    // create todo
    this.element = document.createElement('div');
    this.element.className = 'todo';
    this.element.innerHTML = document.querySelector('.todo-template').innerHTML;

    this.todoName = this.element.querySelector('.todo-name');
    this.todoName.value = todoName;
    this.todoName.setAttribute('checked', 'false');

    this.todoTag = this.element.querySelector('.todo-tag');
    this.todoTag.value = '#' + todoTag;
    
    // set todoCheckbox color according to priority
    this.todoCheckbox = this.element.querySelector('.todo-checkbox');

    // update priority
    this.element.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.name = radioName;
      radio.addEventListener('change', (event) => {
        this.priority = event.target.className;
        this.update();
      })
    });
    radioName++;

    this.element.querySelector(`.${priority}`).checked = true;

    this.svg = this.element.querySelector('svg');

    this.update();
    this.addEvent();
  }

  update() {
    //this.element.querySelector('.todo-title-tag').innerHTML =
    //    '#' + this.todoTag.value;

    if(this.priority == 'high') {
      this.todoCheckbox.style.borderColor = '#f38ba8';
      this.todoCheckbox.style.setProperty('--checkbox-background', '#f38ba8');
    }
    else if(this.priority == 'mid') {
      this.todoCheckbox.style.borderColor = '#f9e2af';
      this.todoCheckbox.style.setProperty('--checkbox-background', '#f9e2af');
    }
    else {
      this.todoCheckbox.style.borderColor = '#a2a2a2';
      this.todoCheckbox.style.setProperty('--checkbox-background', '#a2a2a2');
    }
  }

  addEvent() {
    // expand todo
    this.element.addEventListener('click', (event) => {
      if(event.target != this.todoCheckbox) {
        this.element.style.maxHeight = '140px';
        this.todoName.style.pointerEvents = 'auto'; 
        this.todoTag.style.pointerEvents = 'auto'; 
      }
    });

    // shrink todo
    document.addEventListener('click', (event) => {
      if(event.target != this.element &&
        !this.element.contains(event.target)) {
        this.element.style.maxHeight = '50px';
        this.todoName.style.pointerEvents = 'none'; 
        this.todoTag.style.pointerEvents = 'none'; 
      }
    });

    // toggle todoCheckbox
    this.todoCheckbox.addEventListener('click', () => {
      if(this.todoCheckbox.getAttribute('checked') == 'false') {
        this.todoCheckbox.setAttribute('checked', 'true');
        this.svg.setAttribute('checked', 'true');
        this.todoName.setAttribute('checked', 'true');

        // move the todo from unchecked to checked
        this.todoList.uncheckedTodo.splice(
          this.todoList.uncheckedTodo.indexOf(this), 1);
        this.todoList.checkedTodo.push(this);
      }
      else {
        this.todoCheckbox.setAttribute('checked', 'false');
        this.svg.setAttribute('checked', 'false');
        this.todoName.setAttribute('checked', 'false');

        // move the todo from checked to unchecked
        this.todoList.checkedTodo.splice(
            this.todoList.checkedTodo.indexOf(this), 1);
        this.todoList.uncheckedTodo.push(this);
      }

      this.todoList.update();
    });
  }
}

const todoList1 = new TodoList();

function sortWithName(todoa, todob) {
  return todob.todoName.value.localeCompare(todoa.todoName.value);
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
  if(todoa.todoTag.value == todob.todoTag.value) {
    sortWithPriority(todoa, todob);
  }
  else {
    return todob.todoTag.value.localeCompare(todoa.todoTag.value);
  }
}

// expand sort list
const sortList = document.querySelector('.sort-list');
document.querySelector('.sort-method-selector').addEventListener('click', () => {
  sortList.style.maxHeight = '310px';
});

// shrink sort list
document.addEventListener('click', (event) => {
  if(event.target != sortList && !sortList.contains(event.target)) {
    sortList.style.maxHeight = '70px';
  }
})
