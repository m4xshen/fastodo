let radioName = 1;
let activeList;

const todoCreator = document.querySelector('.todo-creator');

// set the same name to avoid multiple choice
todoCreator.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.name = 0;
});

// expand the todoCreator
const inputName = document.querySelector('.input-name');
inputName.addEventListener('focus', () => {
  todoCreator.style.maxHeight = '210px';
});

// shrink the todoCreator
document.addEventListener('click', (event) => {
  const inputName = document.querySelector('.input-name');
  if(event.target != inputName && !todoCreator.contains(event.target)) {
    todoCreator.style.maxHeight = '50px';
  }
});

// create a new todo when press Enter
todoCreator.addEventListener('keydown', (event) => {
  const inputName = document.querySelector('.input-name');
  if(event.code=='Enter' && inputName.value!='') {
    const inputPriority =
        todoCreator.querySelector('input[type="radio"]:checked');
    const inputTag = todoCreator.querySelector('.todo-creator-tag');

    const newTodo = activeList.addTodo(inputName.value,
        inputPriority.className, inputTag.value, false);

    activeList.uncheckedTodo.push(newTodo);

    // set the default value after adding a new todo
    inputName.value = '';
    todoCreator.querySelector('.low').checked = true;
    inputTag.value = '';

    activeList.update();
  }
});

class TodoList {
  constructor(name) {
    this.name = name;
    this.element = document.querySelector('.todo-list');
    this.uncheckedTodo = [];
    this.checkedTodo = [];

    this.listInput = document.createElement('input');
    this.listInput.type = 'text';
    this.listInput.value = name;

    this.listInput.addEventListener('change', () => {
      this.name = this.listInput.value;
      this.update();
    });

    this.list = document.createElement('div');
    this.list.appendChild(this.listInput);

    document.querySelector('.lists').appendChild(this.list);

    if(activeList != undefined) {
      activeList.list.classList.remove('active');
    }
    activeList = this;
    activeList.list.classList.add('active');

    this.list.addEventListener('click', () => {
      activeList.list.classList.remove('active');
      activeList = this;
      activeList.update();
      activeList.list.classList.add('active');
    });
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

  // update the todo list
  update() {
    document.querySelector('.todo-list').innerHTML = '';
    document.querySelector('.todo-list').appendChild(todoCreator);

    this.checkedTodo.forEach((todo) => {
      this.element.insertBefore(todo.element, todoCreator.nextSibling);
    });
    this.uncheckedTodo.forEach((todo) => {
      this.element.insertBefore(todo.element, todoCreator.nextSibling);
    });

    localStorage.setItem('lists', JSON.stringify(lists));
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
      this.todoCheckboxEle.style.borderColor = '#ebc52d';
      this.todoCheckboxEle.style.setProperty('--checkbox-background', '#ebc52d');
    }
    else if(this.priority == 'mid') {
      this.todoCheckboxEle.style.borderColor = '#ffffda';
      this.todoCheckboxEle.style.setProperty('--checkbox-background', '#ffffda');
    }
    else {
      this.todoCheckboxEle.style.borderColor = '#a2a2a2';
      this.todoCheckboxEle.style.setProperty('--checkbox-background', '#a2a2a2');
    }
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

// event for sort button
document.querySelector('.sort-name').addEventListener('click', () => {
  activeList.uncheckedTodo.sort(sortWithName);
  activeList.update();
})

document.querySelector('.sort-priority').addEventListener('click', () => {
  activeList.uncheckedTodo.sort(sortWithPriority);
  activeList.update();
})

document.querySelector('.sort-tag').addEventListener('click', () => {
  activeList.uncheckedTodo.sort(sortWithTag);
  activeList.update();
})

// set greeting message
const date = new Date();
const hour = date.getHours();

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

const data = JSON.parse(localStorage.getItem('lists'));
const lists = [];

if(data == null) {
  lists.push(new TodoList('Today'));
}
else {
  data.forEach((list) => {
    const tmp = new TodoList(list.name);

    list.uncheckedTodo.forEach(todo => {
      tmp.uncheckedTodo.push(tmp.addTodo(
          todo.todoName, todo.priority, todo.todoTag, false));
    })
    list.checkedTodo.forEach(todo => {
      tmp.checkedTodo.push(tmp.addTodo(
          todo.todoName, todo.priority, todo.todoTag, true));
    })
    lists.push(tmp);
  });
}

activeList.list.classList.remove('active');
activeList = lists[0];
activeList.list.classList.add('active');
activeList.update();

const listCreator = document.querySelector('.list-creator');
listCreator.addEventListener('click', () => {
  lists.push(new TodoList(`List ${lists.length+1}`));
  activeList.update();
});
