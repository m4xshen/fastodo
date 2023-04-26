function sortWithName(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function sortWithDate(a, b) {
  if (a.dateStart == '') {
    return 1;
  } else if (b.dateStart == '') {
    return -1;
  }

  let dateStartA = new Date(a.dateStart).getTime()
  let dateStartB = new Date(b.dateStart).getTime()
  let dateEndA = new Date(a.dateEnd).getTime()
  let dateEndB = new Date(b.dateEnd).getTime()

  if (dateStartA === dateStartB) {
    return dateEndA - dateEndB;
  }
  return dateStartA - dateStartB;
}

function sortWithPriority(a, b) {
  let priorityToNum = {
    'high': 1,
    'mid': 2,
    'low': 3,
  };

  if (a.priority == b.priority) {
    return sortWithDate(a, b);
  }
  return priorityToNum[a.priority] - priorityToNum[b.priority];
}

function TodoList(props) {
  let uncheckedTodo = props.todoList.data.filter(todo => !todo.checked);
  let checkedTodo = props.todoList.data.filter(todo => todo.checked);

  if (props.todoList.sort == 'date') {
    uncheckedTodo.sort(sortWithDate);
  } else if (props.todoList.sort == 'priority') {
    uncheckedTodo.sort(sortWithPriority);
  } else if (props.todoList.sort == 'name') {
    uncheckedTodo.sort(sortWithName);
  }

  return (
    <>
      { uncheckedTodo.map(props.mapTodo) }
      { checkedTodo.map(props.mapTodo) }
    </>
  )
}

export default TodoList;
