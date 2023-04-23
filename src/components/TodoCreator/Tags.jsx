function Tags(props) {
  return (
    <div>
      <div className="font-semibold mb-1">Tags</div>
      <input
        ref={props.tagsRef}
        className="w-full bg-transparent hover:bg-neutral-900 focus:bg-neutral-900
        rounded-md text-sm placeholder-neutral-400 border-0 transition-all p-2 outline-none"
        placeholder="separate tags with comma"
        type="text"
        value={props.todo.tags}
        onChange={() => { props.setTodo({...props.todo, tags: props.tagsRef.current.value.split(',')}) }}
        onKeyDown={(e) => { if (e.key === "Enter") props.handleSubmit(); }}
      />
    </div>
  )
}

export default Tags;
