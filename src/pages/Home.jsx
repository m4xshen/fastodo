import { Link } from 'react-router-dom';
import appImg from '/assets/app.png';
import todoImg from '/assets/todo.png';
import listImg from '/assets/list.png';
import calendarImg from '/assets/calendar.png';
import sortImg from '/assets/sort.png';

function Home() {
  return (
    <div className="bg-amber-50">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold font-sans text-center pt-16 mb-2">Fastodo</h1>
      <div className="text-lg lg:text-xl font-semibold font-sans text-center mb-10 px-10">
        A fast and flexible web-based todo list app. No account required.
      </div>
      <div className="flex flex-col items-center mb-14">
        <Link
          to="/app"
          className="px-6 py-4 w-max text-xl font-semibold text-center bg-yellow hover:brightness-90 transition rounded-xl"
        >
          Get Started
        </Link>
        <a
          className="text-sm font-semibold underline"
          href="https://github.com/m4xshen/fastodo"
        >
          View on GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
      <img
        className="w-10/12 mx-auto rounded-xl mb-14 drop-shadow-md"
        alt="screenshot of fastodo web-based todo app"
        src={appImg}
      />

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
        <img
          src={todoImg}
          alt="screenshot of fastodo's todo creator"
          className="max-w-md w-2/3 rounded-lg drop-shadow-md"
        />
        <div>
          <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">Todo Properties</h2>
          <p className="max-w-sm lg:w-96">
            Create todo with 4 properties: Name, Date, Priority and Tag. Press Enter to add it to list. Click the circle to mark it as done.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
        <div>
          <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
            Multiple Lists
          </h2>
          <p className="max-w-sm lg:w-96">
            Create multiple lists for different purposes: daily todo list, long-term goal list or even project feature list.
          </p>
        </div>
        <img
          src={listImg}
          alt="screenshot of fastodo's multiple list feature"
          className="max-w-[13em] w-2/3 rounded-lg order-first lg:order-last drop-shadow-md"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
        <img
          src={calendarImg}
          alt="screenshot of fastodo's calendar view feature"
          className="max-w-[17em] w-2/3 rounded-lg drop-shadow-md"
        />
        <div>
          <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
            Calendar View
          </h2>
          <p className="max-w-sm lg:w-96">
            View your todos with calendar. The date with todos is highlighted. Click on each date to only show the todos on that day.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
        <div>
          <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
            Sorter
          </h2>
          <p className="max-w-sm lg:w-96">
            Sort your todos with the 4 properties. You can also use it under calendar view.
          </p>
        </div>
        <img
          src={sortImg}
          alt="screenshot of fastodo's sorter feature"
          className="max-w-[8em] w-2/3 rounded-lg order-first lg:order-last drop-shadow-md"
        />
      </div>

      <p className="text-3xl font-bold text-center mt-20 mx-10 pb-1">
        You can access all these features without creating an account!
      </p>
      <p className="text-center mx-10 mb-8 font-semibold">
        Your data will be stored on your device locally and not persisted in any database.
      </p>

      <div className="flex flex-col items-center mb-16">
        <Link
          to="/app"
          className="px-6 py-4 w-max text-xl font-semibold text-center bg-yellow hover:brightness-90 transition rounded-xl"
        >
          Get Started
        </Link>
        <a
          className="text-sm font-semibold underline"
          href="https://github.com/m4xshen/fastodo"
        >
          View on GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>

      <footer className="py-8 bg-[#252525] text-white">
        <div className="text-center">
          <a
            href="https://github.com/m4xshen/fastodo"
            className="fa-brands fa-github"
          /><br /><br />
          Made by Max Shen
        </div>
      </footer>
    </div>
  )
}

export default Home;
