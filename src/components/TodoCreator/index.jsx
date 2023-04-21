import { useRef, useState, useEffect } from 'react';
import Priority from './Priority'
import Title from './Title';
import DateInput from './Date';
import Tags from './Tags';
import Buttons from './Buttons';

const initTodo = {
  name: '',
  priority: 'low',
  dateStart: '',
  dateEnd: '',
  tags: [],
  checked: false
};

function TodoCreator(props) {
  const [todo, setTodo] = useState(props.displayedTodo);
  const nameRef = useRef(null);
  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  function handleSubmit() {
    if (todo.name == '') return;

    // reset
    nameRef.current.focus();
    nameRef.current.value = '';
    dateStartRef.current.value = '';
    dateEndRef.current.value = '';
    tagsRef.current.value = '';
    props.setDisplayedTodo(initTodo);

    if (props.creatorState === 'add') {
      props.setTodoList({...props.todoList, data:[todo, ...props.todoList.data]});
      setTodo(initTodo);
    } else if (props.creatorState === 'edit') {
      let newTodoListData = props.todoList.data.map(t => {
        if (t === props.displayedTodo) return todo;
        return t;
      });
      props.setTodoList({...props.todoList, data: newTodoListData});
      props.setCreatorState('hidden');
    }
  }

  return (
    <>
      <div
        className="w-screen h-screen fixed top-0 left-0 bg-black z-10 opacity-50"
        onClick={() => {
          props.setCreatorState('hidden');
          props.setDisplayedTodo(initTodo);
        }}
      />
      <div
        className="w-[48%] h-max px-10 py-8 text-white bg-neutral-800
        rounded-lg fixed left-[26%] z-20 flex flex-col gap-5 outline-none top-16"
      >
        <Title 
          todo={todo}
          setTodo={setTodo}
          nameRef={nameRef}
          handleSubmit={handleSubmit}
        />
        <div className="flex gap-10">
          <DateInput
            todo={todo}
            setTodo={setTodo}
            dateStartRef={dateStartRef}
            dateEndRef={dateEndRef}
          />
          <div className="flex flex-col w-1/2 gap-10">
            <Priority
              todo={todo}
              setTodo={setTodo}
            />
            <Tags
              todo={todo}
              setTodo={setTodo}
              tagsRef={tagsRef}
              handleSubmit={handleSubmit}
            />
            <Buttons
              creatorState={props.creatorState}
              setCreatorState={props.setCreatorState}
              setDisplayedTodo={props.setDisplayedTodo}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
};

export default TodoCreator;
