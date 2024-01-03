import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../ui/Spinner.jsx';
import { getLeaderboard } from './apiLeaderboard.js';

function Leaderboard() {
  const [players, setPlayers] = useState(null);
  const [sortField, setSortField] = useState('gamesPlayed');
  const [sortOrder, setSortOrder] = useState('desc');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlayers() {
      const data = await getLeaderboard(sortField, sortOrder);
      setPlayers(data);
    }

    navigate(`/leaderboard?sort=${sortField}&order=${sortOrder}`);

    fetchPlayers();
  }, [sortField, sortOrder, navigate]);

  function handleSort(field) {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }

  if (!players) return <Spinner />;

  return (
    <div className="overflow-y-scroll p-5 md:p-10">
      <table className="w-full border-collapse table-fixed text-center">
        <thead className="h-[75px]">
          <tr className="text-pink-700">
            <th
              onClick={() => handleSort('username')}
              className="cursor-pointer hover:bg-gray-600 transition-colors duration-400 rounded-l-lg bg-gray-800"
            >
              Username
            </th>
            <th
              onClick={() => handleSort('gamesPlayed')}
              className="cursor-pointer hover:bg-gray-600 transition-colors duration-400 bg-gray-800"
            >
              Games Played
            </th>
            <th
              onClick={() => handleSort('gamesWon')}
              className="cursor-pointer hover:bg-gray-600 transition-colors duration-400 rounded-r-lg bg-gray-800"
            >
              Games Won
            </th>
            <th className="rounded-r-lg bg-gray-800">Status</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player._id} className="border-b border-gray-600 h-[50px]">
              <td className="text-pink-500">
                <Link to={`/profile/${player.username}`}>
                  {player.username}
                </Link>
              </td>
              <td>{player.gamesPlayed}</td>
              <td>{player.gamesWon}</td>
              <td>
                {player.status === 'active' ? (
                  <span className="rounded-full bg-green-600 text-gray-900 px-3 py-1 text-lg">
                    not banned
                  </span>
                ) : (
                  <span className="rounded-full bg-red-600 text-gray-900 px-3 py-1 text-lg">
                    banned
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
