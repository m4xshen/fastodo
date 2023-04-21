function Checkbox(props) {
  function handleClick(e) {
    let newTodoListData = props.todoList.data.filter(t => t !== props.todo);
    newTodoListData.push({...props.todo, checked: !props.todo.checked})
    props.setTodoList({...props.todoList, data: newTodoListData});

    // don't open todo creator when user click on checkbox
    e.stopPropagation();
  }

  let bgColor;
  if (props.priority === 'high') {
    bgColor = 'bg-amber-300'
  } else if (props.priority === 'mid') {
    bgColor = 'bg-amber-100'
  } else {
    bgColor = 'bg-neutral-400'
  }

  let bdColor;
  if (props.priority === 'high') {
    bdColor = 'border-amber-300'
  } else if (props.priority === 'mid') {
    bdColor = 'border-amber-100'
  } else {
    bdColor = 'border-neutral-400'
  }

  return (
    <>
      {props.checked
        ? <button
          onClick={handleClick}
          className={`w-5 h-5 border-2 rounded-full flex shrink-0 ${bgColor} ${bdColor}`}
        >
          <svg width="10" height="10" className="mx-auto self-center">
            <path stroke="black" fill="transparent" d="M 1 3 L 4 9 L 8 0" />
          </svg>
        </button>
        : <button
          onClick={handleClick}
          className={`w-5 h-5 border-2 rounded-full flex shrink-0 ${bdColor}`}
        />
      }
    </>
  )
}

export default Checkbox;
