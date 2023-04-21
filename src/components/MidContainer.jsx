import Todo from './Todo';
import { nanoid } from 'nanoid';

function MidContainer(props) {
  function mapTodo(todo) {
    return (
      <Todo
        todo={todo}
        todoList={props.todoList}
        setTodoList={props.setTodoList}
        key={nanoid()}
        creatorState={props.creatorState}
        setCreatorState={props.setCreatorState}
        setDisplayedTodo={props.setDisplayedTodo}
      />
    )
  }

  return (
    <>
      <div className="flex flex-col items-center pt-10 ml-52 xl:ml-0 gap-4 overflow-scroll">
        <button
          className="w-10 h-10 rounded-md text-2xl
            border-amber-200 text-white hover:text-black bg-neutral-800 hover:bg-amber-200 transition-all"
          title="Add Todo [a]"
          onClick={() => {
            props.setCreatorState('add');
          }}
        >
          +
        </button>
        { props.todoList.data.filter(todo => !todo.checked).map(mapTodo) }
        { props.todoList.data.filter(todo => todo.checked).map(mapTodo) }
      </div>
    </>
  );
}

export default MidContainer;
