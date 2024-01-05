import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext.jsx';
import { useOutsideClick } from '../../hooks/useOutsideclick.js';
import { searchApi } from '../profile/apiProfile.js';

function Search() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const { ref } = useOutsideClick(() => setResults([]));
  const { isDarkMode } = useDarkMode();

  async function handleSearch(e) {
    setQuery(e.target.value);

    if (!e.target.value) return setResults([]);

    try {
      const data = await searchApi(e.target.value);
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="relative">
      <input
        className="w-40 rounded-full bg-white px-4 py-2 text-lg transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        placeholder="Search"
        value={query}
        onChange={handleSearch}
      />
      {results.length > 0 ? (
        <div
          className={`absolute rounded-lg min-w-full mt-1 p-1 flex flex-col gap-1 overflow-y-scroll max-h-96 z-50 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-400'
          }`}
          ref={ref}
        >
          {results.map(result => (
            <Link
              to={`/profile/${result.username}`}
              key={result._id}
              className="bg-gray-900 rounded-full text-white px-3 py-1 hover:bg-gray-950 transition-all text-xl text-center"
              onClick={() => setQuery('')}
            >
              {result.username}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Search;
