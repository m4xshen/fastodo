import TodoList from './TodoList';
import Todo from './Todo';
import SortButton from './SortButton';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';

function MidContainer(props) {
  const [showSort, setShowSort] = useState(false);
  let ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      // click outside of ref
      if (ref.current && !ref.current.contains(e.target)) {
        setShowSort(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    }
  }, [ref])

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
      <div className="flex flex-col items-center pt-10 ml-52 xl:ml-0 gap-2">
        <div className="w-[35rem] flex gap-3">
          <button
            className="w-auto h-7 rounded-md px-1 py-0
            text-neutral-300 bg-neutral-900 hover:bg-neutral-800 transition-all"
            onClick={() => {
              props.setCreatorState('add');
            }}
          >
            + Add Todo
          </button>
          <button
            className="w-auto h-7 rounded-md px-1 py-0 relative ml-auto
            text-neutral-300 bg-neutral-900 hover:bg-neutral-800 transition-all"
            onClick={() => {
              setShowSort(true);
            }}
          >
            Sort
            {showSort &&
              <div
                ref={ref}
                className="absolute w-24 p-2 flex flex-col gap-1 items-start rounded-sm bg-neutral-700 top-9 z-10"
              >
                <SortButton
                  name="None"
                  todoList={props.todoList}
                  setTodoList={props.setTodoList}
                  value={null}
                />
                <SortButton
                  name="Name"
                  todoList={props.todoList}
                  setTodoList={props.setTodoList}
                  value={'name'}
                />
                <SortButton
                  name="Date"
                  todoList={props.todoList}
                  setTodoList={props.setTodoList}
                  value={'date'}
                />
                <SortButton
                  name="Priority"
                  todoList={props.todoList}
                  setTodoList={props.setTodoList}
                  value={'priority'}
                />
              </div>
            }
          </button>
        </div>
        <TodoList
          todoList={props.todoList}
          mapTodo={mapTodo}
        />
      </div>
    </>
  );
}

export default MidContainer;
