function SortButton(props) {
  return (
    <button
      className="w-full p-1 rounded-sm text-sm hover:bg-neutral-600
      text-left cursor-pointer transition-all"
      onClick={() => {props.setTodoList({...props.todoList, sort: props.value})}}
    >
      {props.name}
    </button>
  )
}

export default SortButton;
