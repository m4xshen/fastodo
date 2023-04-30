function SortButton(props) {
  return (
    <button
      className="w-full p-1 rounded-sm text-sm hover:bg-neutral-600
      text-left cursor-pointer transition-all"
      onClick={() => {
        const newTodoLists = props.todoLists.map(todoList => {
          if (todoList.id === props.activeListId) {
            return {...todoList, sort: props.value};
          }
          return todoList;
        })
        props.setTodoLists(newTodoLists);
      }}
    >
      {props.name}
    </button>
  )
}

export default SortButton;
