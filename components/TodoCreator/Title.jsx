function Title(props) {
  return (
    <input
      ref={props.nameRef}
      className="bg-transparent hover:bg-neutral-900 focus:bg-neutral-900
      rounded-md text-2xl font-semibold placeholder-neutral-400 border-0 transition-all p-3 outline-none"
      placeholder="Todo's Title"
      type="text"
      value={props.todo.name}
      onChange={() => { props.setTodo({...props.todo, name: props.nameRef.current.value}); }}
      onKeyDown={(e) => { if(e.key === "Enter") props.handleSubmit(); }}
    />)
}

export default Title;
