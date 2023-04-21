import { Link } from "react-router-dom";

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
                className={`text-white w-44 mx-auto px-2 py-3 rounded-md flex justify-between
                font-semibold transition cursor-pointer group bg-neutral-800
                ${todoList.id===props.todoList.id && 'bg-neutral-900'}`}
                key={todoList.id}
              >
                <div>
                  {todoList.name}
                </div>
                <button className="text-neutral-300 opacity-0 group-hover:opacity-100 transition">
                  ✕
                </button>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default LeftContainer;
