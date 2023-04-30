import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { useRef } from 'react';
import favicon from '/favicon.ico';

const initTodoList = () => (
  {
    id: nanoid(),
    name: 'New List',
    data: [],
    sort: null,
    filter: null,
  }
);

function LeftContainer(props) {
  const todoListNameRef = useRef(null);

  return (
    <div className="fixed left-0 top-0 w-52 h-full bg-neutral-800">
      <div className="mt-2 mb-10 ml-4 flex items-center gap-1">
        <img className="w-6 h-6" src={favicon}/>
        <h1 className="text-white text-2xl font-bold">
          <Link to="/fastodo/">Fastodo</Link>
        </h1>
      </div>
      <div className="flex flex-col gap-1">
        {
          props.todoLists.map(todoList => {
            return (
              <div
                className={`w-44 mx-auto px-2 py-3 rounded-md flex justify-between
                font-semibold transition cursor-pointer group bg-neutral-800
                ${todoList.id===props.activeListId ? 'bg-yellow text-neutral-900' : 'text-white'}`}
                key={todoList.id}
                onClick={() => {
                  props.setActiveListId(todoList.id);
                }}
              >
                <input
                  ref={todoList.id === props.activeListId ? todoListNameRef : null}
                  type="text"
                  defaultValue={todoList.name}
                  className="w-36 bg-transparent outline-none cursor-pointer focus:cursor-text"
                  onChange={() => {
                    const newTodoLists = props.todoLists.map(todoList => {
                      if (todoList.id === props.activeListId) {
                        return {...todoList, name: todoListNameRef.current.value};
                      }
                      return todoList;
                    })

                    props.setTodoLists(newTodoLists);
                  }}
                />
                <button className={`text-neutral-900 invisible
                ${todoList.id===props.activeListId && 'group-hover:visible'}`}
                  onClick={() => {
                    const newTodoLists = props.todoLists.filter(todoList => todoList.id!==props.activeListId);
                    props.setTodoLists(newTodoLists);
                    props.setActiveListId(newTodoLists[0].id);
                  }}
                >
                  ✕
                </button>
              </div>
            )
          })
        }
      </div>
      <button
        className="text-white w-44 px-2 py-3"
        onClick={() => {
          props.setTodoLists([...props.todoLists, initTodoList()]);
        }}
      >
        + Add Todo List
      </button>
    </div>
  );
}

export default LeftContainer;
