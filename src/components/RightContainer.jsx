import Calendar from "./Calendar";

function RightContainer(props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div
      className="hidden xl:block fixed right-0 top-0 w-80 h-full bg-neutral-800"
    >
      <Calendar
        date={today}
        todoList={props.todoList}
        setTodoList={props.setTodoList}
      />
      <div className="w-full flex justify-around">
        <button 
          className="text-white bg-neutral-700 hover:bg-neutral-600 transition rounded-md p-1"
          onClick={() => {
            props.setTodoList({...props.todoList, filter: null});
          }}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
}

export default RightContainer;
