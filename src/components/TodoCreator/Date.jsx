function DateInput(props) {
  return (
    <div className="w-1/2">
      <div className="font-semibold mb-1">Date</div>
      <div className="w-max flex flex-col gap-1">
        <input 
          ref={props.dateStartRef}
          className="bg-transparent hover:bg-neutral-900 focus:bg-neutral-900
          rounded-md text-sm placeholder-neutral-400 border-0 transition-all p-2 outline-none"
          type="date"
          value={props.todo.dateStart}
          onChange={() => {
            props.setTodo({...props.todo, dateStart: props.dateStartRef.current.value});
            // TODO: clear the end date if the start date is empty
          }}
        />
        <div className="self-center text-neutral-400 text-sm">
          |
        </div>
        <input 
          ref={props.dateEndRef}
          className="bg-transparent hover:bg-neutral-900 focus:bg-neutral-900
          rounded-md text-sm placeholder-neutral-400 border-0 transition-all p-2 outline-none"
          type="date"
          disabled={props.todo.dateStart === ''}
          value={props.todo.dateEnd}
          onChange={() => {
            props.setTodo({...props.todo, dateEnd: props.dateEndRef.current.value});
          }}
        />
      </div>
    </div>
  )
}

export default DateInput;
