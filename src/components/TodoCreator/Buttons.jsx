const initTodo = {
  name: '',
  priority: 'low',
  dateStart: '',
  dateEnd: '',
  tags: [],
  checked: false
};

function Buttons(props) {
  return (
    <div className="flex justify-end mt-auto gap-5 pl-3">
      <button
        onClick={() => {
          props.setCreatorState('hidden');
          props.setDisplayedTodo(initTodo);
        }}
        className="text-black bg-amber-200 hover:brightness-75 rounded-md py-2 px-3 transition-all"
      >
        Cancel
      </button>
      <button
        className="text-black bg-amber-200 hover:brightness-75 rounded-md py-2 px-3 transition-all"
        onClick={props.handleSubmit}
      >
        {
          props.creatorState === 'add'
            ? 'Add'
            : 'Save'
        }
      </button>
    </div>
  )
}

export default Buttons;
