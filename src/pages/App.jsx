import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import TodoCreator from '../components/TodoCreator/index';
import LeftContainer from '../components/LeftContainer';
import MidContainer from '../components/MidContainer';
import RightContainer from '../components/RightContainer';

const data = [
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
  const [todoList, setTodoList] = useState(data);

  useEffect(() => {
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

    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, [creatorState]);

  return (
    <div className="font-sans w-screen min-h-screen h-full bg-neutral-900">
      <AnimatePresence>
        {creatorState!=='hidden' &&
          <TodoCreator
            todoList={todoList}
            setTodoList={setTodoList}
            creatorState={creatorState}
            setCreatorState={setCreatorState}
            displayedTodo={displayedTodo}
            setDisplayedTodo={setDisplayedTodo}
          />
        }
      </AnimatePresence>
      <LeftContainer/>
      <MidContainer
        todoList={todoList}
        setTodoList={setTodoList}
        creatorState={creatorState}
        setCreatorState={setCreatorState}
        setDisplayedTodo={setDisplayedTodo}
      />
      <RightContainer />
    </div>
  );
}

export default App;
