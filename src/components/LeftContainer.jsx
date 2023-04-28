import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

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
  return (
    <div className="fixed left-0 top-0 w-52 h-full bg-neutral-800">
      <div className="mt-2 mb-10 ml-4 flex items-center gap-1">
        <img className="w-6 h-6" src="/favicon.ico" />
        <h1 className="text-white text-2xl font-bold">
          <Link to="/">Fastodo</Link>
        </h1>
      </div>
      <div className="flex flex-col gap-1">
        {
          props.todoLists.map(todoList => {
            return (
              <div
                className={`w-44 mx-auto px-2 py-3 rounded-md flex justify-between
                font-semibold transition cursor-pointer group bg-neutral-800
                ${todoList.id===props.todoList.id ? 'bg-yellow text-neutral-900' : 'text-white'}`}
                key={todoList.id}
                onClick={() => {
                  props.setTodoList(todoList);
                }}
              >
                <div>
                  {todoList.name}
                </div>
                <button className={`text-neutral-900 invisible
                ${todoList.id===props.todoList.id && 'group-hover:visible'}`}
                  onClick={() => { alert('delete todo list'); } }
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
