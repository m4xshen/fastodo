import { useState, useEffect } from 'react';
import TodoCreator from '../components/TodoCreator/index';
import LeftContainer from '../components/LeftContainer';
import MidContainer from '../components/MidContainer';
import RightContainer from '../components/RightContainer';

const todoList1 = {
  id: 1,
  name: 'List 1',
  data: [
    {
      name: 'Calculus HW',
      priority: 'low',
      dateStart: '2023-04-21',
      dateEnd: '',
      tags: ['homework'],
      checked: true
    },
    {
      name: 'Monkeytype 10min',
      priority: 'mid',
      dateStart: '2023-04-21',
      dateEnd: '',
      tags: ['habits', 'typing'],
      checked: false
    }
  ]
};

const todoList2 = {
  id: 2,
  name: 'List 2',
  data: [
    {
      name: 'Test',
      priority: 'low',
      dateStart: '2023-04-21',
      dateEnd: '',
      tags: ['test'],
      checked: false
    },
  ]
};

const todoLists = [
  todoList1,
  todoList2
];

const initTodo = {
  name: '',
  priority: 'low',
  dateStart: '',
  dateEnd: '',
  tags: [],
  checked: false
};

function App() {
  const [creatorState, setCreatorState] = useState('hidden');
  const [displayedTodo, setDisplayedTodo] = useState(initTodo);
  const [todoList, setTodoList] = useState(todoList1);

  useEffect(() => {
    // update original todoLists TODO: use PUT
    const index = todoLists.findIndex(tl => tl.id === todoList.id);
    if (index !== -1) {
      todoLists[index] = { ...todoList };
    }
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
      <RightContainer />
    </div>
  );
}

export default App;
