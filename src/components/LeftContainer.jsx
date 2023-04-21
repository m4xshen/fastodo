import { Link } from "react-router-dom";

function LeftContainer() {
  return (
    <div className="fixed left-0 top-0 w-52 h-full bg-neutral-800">
      <div className="mt-2 ml-4 flex items-center gap-1">
        <img className="w-6 h-6" src="/favicon.ico" />
        <h1 className="text-white text-2xl font-bold">
          <Link to="/">Fastodo</Link>
        </h1>
      </div>
    </div>
  );
}

export default LeftContainer;
