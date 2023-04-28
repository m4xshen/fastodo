import { useState, useEffect } from 'react';
import TodoCreator from '../components/TodoCreator/index';
import LeftContainer from '../components/LeftContainer';
import MidContainer from '../components/MidContainer';
import RightContainer from '../components/RightContainer';
import { nanoid } from 'nanoid';

const initTodo = {
  name: '',
  priority: 'low',
  dateStart: '',
  dateEnd: '',
  tags: [],
  checked: false
};

const initTodoList = () => (
  {
    id: nanoid(),
    name: 'New List',
    data: [],
    sort: null,
    filter: null,
  }
);

function App() {
  // localStorage.clear();
  const [creatorState, setCreatorState] = useState('hidden');
  const [todoLists, setTodoLists] = useState(JSON.parse(localStorage.getItem('todoLists')) || [initTodoList()]);
  const [todoList, setTodoList] = useState(todoLists[0]);
  const [displayedTodo, setDisplayedTodo] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
  }, [todoLists]);

  useEffect(() => {
    setTodoLists(...todoLists, todoList);

    const newTodoLists = todoLists.map(tl => {
      if (tl.id === todoList.id) {
        return todoList;
      }
      return tl;
    });
    setTodoLists(newTodoLists);
  }, [todoList]);

  function handleKeyDown(e) {
    if (e.key==='a' && creatorState==='hidden') {
      setCreatorState('add');

      // don't type 'a' into input
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setCreatorState('hidden');
      setDisplayedTodo(initTodo);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, [creatorState]);

  const todoCreatorProps = {
    todoList,
    setTodoList,
    creatorState,
    setCreatorState,
    displayedTodo,
    setDisplayedTodo,
  };

  const leftContainerProps = {
    todoList,
    setTodoList,
    todoLists,
    setTodoLists,
  };

  const midContainerProps = {
    todoList,
    setTodoList,
    creatorState,
    setCreatorState,
    setDisplayedTodo,
  };

  return (
    <div className="font-sans w-screen min-h-screen h-full bg-neutral-900">
      {creatorState!=='hidden' && <TodoCreator {...todoCreatorProps} />}
      <LeftContainer {...leftContainerProps} />
      <MidContainer {...midContainerProps} />
      <RightContainer
        todoList={todoList}
        setTodoList={setTodoList}
      />
    </div>
  );
}

export default App;
