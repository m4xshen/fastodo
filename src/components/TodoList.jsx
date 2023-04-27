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

  if (props.todoList.filter != null) {
    uncheckedTodo = uncheckedTodo.filter(todo => {
      const dateStart = new Date(todo.dateStart);
      dateStart.setHours(0, 0, 0, 0);

      const dateEnd = new Date(todo.dateEnd);
      dateEnd.setHours(0, 0, 0, 0);

      if (todo.dateStart !== "" && todo.dateEnd !== "") {
        return dateStart.getTime() <= props.todoList.filter.getTime() &&
          props.todoList.filter.getTime() <= dateEnd.getTime();
      } else if (todo.dateStart !== "" && todo.dateEnd === "") {
        return dateStart.getTime() === props.todoList.filter.getTime();
      }

      return false;
    });

    checkedTodo = checkedTodo.filter(todo => {
      const dateStart = new Date(todo.dateStart);
      dateStart.setHours(0, 0, 0, 0);

      return dateStart.getTime() == props.todoList.filter.getTime();
    });

  }

  return (
    <>
      { (uncheckedTodo.length === 0 && checkedTodo.length === 0)
        &&
        <div className="text-white pt-10 text-sm">
          No Data
        </div>
      }
      { uncheckedTodo.map(props.mapTodo) }
      { checkedTodo.map(props.mapTodo) }
    </>
  )
}

export default TodoList;
