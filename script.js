let radioName = 1;
let activeList;

const dayName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const priorityToColor = {'high': '#ebc52d', 'mid': '#ffffda', 'low': '#a2a2a2'}

const date = new Date();
let currentYear = date.getFullYear(); 
let currentMonth = date.getMonth(); 

const todoCreator = document.querySelector('.todo-creator');

// set the same name to avoid multiple choice
todoCreator.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.name = 0;
});

// expand the todoCreator
const inputName = document.querySelector('.input-name');
inputName.addEventListener('focus', () => {
  todoCreator.style.maxHeight = '280px';
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
    const inputDate = todoCreator.querySelector('.todo-creator-date');

    const newTodo = activeList.addTodo(inputName.value, inputDate.value,
        inputPriority.className, inputTag.value, false);

    activeList.uncheckedTodo.push(newTodo);

    // set the default value after adding a new todo
    inputName.value = '';
    todoCreator.querySelector('.low').checked = true;
    inputTag.value = '';
    inputDate.value = '';

    activeList.update();
    inputName.focus();
  }
});

class TodoList {
  constructor(name) {
    this.name = name;
    this.element = document.querySelector('.todo-list');
    this.uncheckedTodo = [];
    this.checkedTodo = [];

    this.list = document.createElement('div');
    this.list.innerHTML = document.querySelector('.list-template').innerHTML;

    this.listInput = this.list.querySelector('input');
    this.listInput.value = name;

    // add event to delete list button
    this.deleteList = this.list.querySelector('.fa-xmark');
    this.deleteList.addEventListener('click', () => {
      activeList = lists[0];
      activeList.list.classList.add('active');
      activeList.update();

      lists.splice(lists.indexOf(this), 1);
      document.querySelector('.lists').removeChild(this.list);
    })

    this.listInput.addEventListener('change', () => {
      this.name = this.listInput.value;
      this.update();
    });

    document.querySelector('.lists').appendChild(this.list);

    if(activeList != undefined) {
      activeList.list.classList.remove('active');
    }
    activeList = this;
    activeList.list.classList.add('active');

    this.list.addEventListener('click', (event) => {
      if(event.target != this.deleteList) {
        activeList.list.classList.remove('active');
        activeList = this;
        activeList.update();
        activeList.list.classList.add('active');
      }
    });
  }

  // create a new todo
  addTodo(inputName, inputDate, inputPriority, inputTag, inputChecked) {
    const newTodo =
        new Todo(inputName, inputDate, inputPriority, inputTag, inputChecked);

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

    newTodo.todoNameEle.addEventListener('change', () => {
      newTodo.update();
      this.update();
    })

    newTodo.todoDateEle.addEventListener('change', () => {
      newTodo.update();
      this.update();
    })

    newTodo.todoTagEle.addEventListener('change', () => {
      newTodo.update();
      this.update();
    })

    newTodo.element.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('click', () => {
        newTodo.update();
        this.update();
      })
    });

    // toggle todoCheckbox
    newTodo.todoCheckboxEle.addEventListener('click', () => {
      newTodo.checked = !newTodo.checked;

      if(newTodo.checked) {
        // move the todo from unchecked to checked
        this.uncheckedTodo.splice(this.uncheckedTodo.indexOf(newTodo), 1);
        this.checkedTodo.push(newTodo);

        // congratulate the user when finishing all tasks
        if(this.uncheckedTodo.length == 0) {
          const congrats = document.querySelector('.congratulations')
          const dim = document.querySelector('.dim');
          congrats.style.top = '200px';
          dim.style.top = '0';

          setTimeout(function(){
            congrats.style.top = '-200px';
            dim.style.top = '-100%';
          }, 2500);
        }
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

    createCalendar(currentYear, currentMonth, this);
    localStorage.setItem('lists', JSON.stringify(lists));
  }
}

class Todo {
  constructor(todoName, todoDate, priority, todoTag, checked) {
    this.todoName = todoName;
    this.checked = checked;
    this.priority = priority;
    this.todoDate = todoDate;
    this.todoTag = todoTag;

    // create todo
    this.element = document.createElement('div');
    this.element.className = 'todo';
    this.element.innerHTML = document.querySelector('.todo-template').innerHTML;

    this.todoNameEle = this.element.querySelector('.todo-name');
    this.todoNameEle.value = todoName;

    this.todoDateEle = this.element.querySelector('.todo-date');
    this.todoDateEle.value = todoDate;

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
    this.todoDate = this.todoDateEle.value;
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
    const color = priorityToColor[this.priority];
    this.todoCheckboxEle.style.borderColor = color;
    this.todoCheckboxEle.style.setProperty('--checkbox-background', color);
  }

  addEvent() {
    // expand todo
    this.element.addEventListener('click', (event) => {
      if(event.target != this.todoCheckboxEle) {
        this.element.style.maxHeight = '190px';
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

function sortWithDate(todoa, todob) {
  const datea = new Date(todoa.todoDate);
  const dateb = new Date(todob.todoDate);
  if(datea < dateb) {
    return true;
  }
  else if(datea > dateb) {
    return false;
  }

  // if date are same, sort with priority
  return sortWithPriority(todoa, todob);
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

document.querySelector('.sort-date').addEventListener('click', () => {
  activeList.uncheckedTodo.sort(sortWithDate);
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

document.querySelector('.calendar-bt').addEventListener('click', () => {
  document.querySelector('.calendar-bt').classList.toggle('visible');
  document.querySelector('.right-bar').classList.toggle('visible');
  document.querySelector('.greeting').classList.toggle('visible');
  document.querySelector('.todo-list').classList.toggle('visible');
});

// set greeting message
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

document.querySelector('.date').innerHTML =
    monthName[date.getMonth()] + '<br>' + date.getDate();

// localStorage.clear();

const data = JSON.parse(localStorage.getItem('lists'));
const lists = [];

if(data == undefined || data.length == 0) {
  lists.push(new TodoList('Today'));
}
else {
  data.forEach((list) => {
    const tmp = new TodoList(list.name);

    list.uncheckedTodo.forEach(todo => {
      tmp.uncheckedTodo.push(tmp.addTodo(todo.todoName, todo.todoDate,
          todo.priority, todo.todoTag, false));
    })
    list.checkedTodo.forEach(todo => {
      tmp.checkedTodo.push(tmp.addTodo(todo.todoName, todo.todoDate,
          todo.priority, todo.todoTag, true));
    })
    lists.push(tmp);
  });
}

// set first list as active
if(activeList != undefined) {
  activeList.list.classList.remove('active');
}
activeList = lists[0];
activeList.list.classList.add('active');
activeList.update();

const listCreator = document.querySelector('.list-creator');
listCreator.addEventListener('click', () => {
  lists.push(new TodoList(`List ${lists.length+1}`));
  activeList.update();
});

function createCalendar(y, m, todolist) {
  document.querySelector('.month').innerHTML = monthName[m];
  document.querySelector('.year').innerHTML = y;
  const calendarTodo = document.querySelector('.calendar-todo');
  calendarTodo.innerHTML = '';

  const s = new Date(y, m, 1).getDay(); // start
  const e = new Date(y, m+1, 0).getDate(); // end

  const calendar = document.querySelector('.calendar');

  calendar.innerHTML = '';
  // create day name
  for(let i = 0; i < 7; i++) {
    const tmp = document.createElement('div');
    tmp.className = 'day';
    tmp.innerHTML = dayName[i];
    calendar.appendChild(tmp);
  }

  for(let i = 0; i < s + e; i++) {
    const tmp = document.createElement('div');
    if(i >= s) {
      tmp.innerHTML = i-s+1;

      for(let j = 0; j < todolist.uncheckedTodo.length; j++) {
        const date = new Date(todolist.uncheckedTodo[j].todoDate);
        // there are todos on that day
        if(date.getFullYear() == y && date.getMonth() == m &&
          date.getDate() == i-s+1) {
          tmp.style.backgroundColor = '#505050';
          break;
        }
      }

      // show the todo on that day
      tmp.addEventListener('click', () => {
        calendarTodo.innerHTML = '';

        todolist.uncheckedTodo.forEach((todo) => {
          const date = new Date(todo.todoDate);
          if(date.getFullYear() == y && date.getMonth() == m &&
            date.getDate() == i-s+1) {
            // show unchecked todo below
            const div = document.createElement('div');
            div.innerHTML = todo.todoName;
            calendarTodo.appendChild(div);
          }
        })
      })
    }

    // mark today
    const today = new Date();
    if(y == today.getFullYear() && m == today.getMonth() &&
      i-s+1 == today.getDate()) {
      tmp.style.backgroundColor = '#ebc52d';
      tmp.style.color = '#141414';
    }

    calendar.appendChild(tmp);
  }
}

// previous month
document.querySelector('.fa-caret-left').addEventListener('click', () => {
  currentMonth--;
  if(currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  createCalendar(currentYear, currentMonth, activeList);
})

// next month
document.querySelector('.fa-caret-right').addEventListener('click', () => {
  currentMonth++;
  if(currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  createCalendar(currentYear, currentMonth, activeList);
})

// easter egg
let count = 0;
const icon = document.querySelector('.icon');
icon.addEventListener('click', () => {
  icon.classList.toggle('rotate');
  if(++count == 5) {
    icon.style.transform = 'rotate(1080deg)';
  }
})
