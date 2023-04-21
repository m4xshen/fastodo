import Checkbox from '../Checkbox';
import Date from './Date';
import Tags from './Tags';

function Todo(props) {
  return (
    <div
      className="w-[35rem] h-20 px-3 rounded-lg bg-neutral-800 text-white relative
      flex items-center gap-3 cursor-pointer group"
      onClick={() => {
        props.setCreatorState('edit');
        props.setDisplayedTodo(props.todo)
      }}
    >
      <button
        className="absolute right-3 top-2
        text-neutral-800 group-hover:text-neutral-300 transition"
        onClick={(e) => {
          let newTodoList = props.todoList.filter(todo => todo !== props.todo);
          props.setTodoList(newTodoList);
          e.stopPropagation();
        }}
      >
        ✕
      </button>
      <Checkbox
        todo={props.todo}
        todoList={props.todoList}
        setTodoList={props.setTodoList}
        checked={props.todo.checked}
        priority={props.todo.priority}
      />
      <div className="flex flex-col h-full w-full justify-center">
        <div className={`text-sm ${props.todo.checked && 'line-through'}`}>
          {props.todo.name}
        </div>
        <div className="flex flex-row w-full justify-between">
          <Date
            dateStart={props.todo.dateStart}
            dateEnd={props.todo.dateEnd}
          />
          <Tags tags={props.todo.tags} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
