import { GiBreakingChain } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useMoveBack } from '../../hooks/useMoveBack.js';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="fixed flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden">
      <GiBreakingChain className="rotate-90 text-8xl" />
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">This Page Isn't Available</h1>
        <p className="max-w-[400px] text-center text-gray-400">
          The link may be broken, or the page may have been removed.
        </p>
      </div>
      <Link
        to="/"
        className="rounded-full bg-pink-800 px-8 py-2 font-semibold text-white hover:bg-pink-900 text-2xl"
      >
        Go to Home
      </Link>
      <button onClick={moveBack} className="text-gray-400 hover:underline">
        Go Back
      </button>
    </div>
  );
}

export default PageNotFound;
