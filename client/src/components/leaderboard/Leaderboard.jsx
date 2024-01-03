import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="overflow-scroll p-5 md:p-10">
      <table className="w-full border-collapse table-fixed text-center">
        <thead className="h-[75px]">
          <tr className="text-gray-300">
            <th
              onClick={() => handleSort('username')}
              className="cursor-pointer hover:bg-gray-600 transition-colors duration-400 rounded-lg bg-gray-700"
            >
              Username
            </th>
            <th
              onClick={() => handleSort('gamesPlayed')}
              className="cursor-pointer hover:bg-gray-600 transition-colors duration-400 rounded-lg bg-gray-700"
            >
              Games Played
            </th>
            <th
              onClick={() => handleSort('gamesWon')}
              className="cursor-pointer hover:bg-gray-600 transition-colors duration-400 rounded-lg bg-gray-700"
            >
              Games Won
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player._id} className="border-b border-gray-600 h-[50px]">
              <td>{player.username}</td>
              <td>{player.gamesPlayed}</td>
              <td>{player.gamesWon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
