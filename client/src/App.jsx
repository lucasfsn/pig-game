import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home.jsx';
import Leaderboard from './components/leaderboard/Leaderboard.jsx';
import PlayerProfile from './components/profile/PlayerProfile.jsx';
import Settings from './components/settings/Settings.jsx';
import AppLayout from './components/ui/AppLayout.jsx';
import ProtectedRoute from './components/ui/ProtectedRoute.jsx';
import Login from './components/user/Login.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username?" element={<PlayerProfile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#f9fafb',
            color: '#374151',
          },
        }}
      />
    </>
  );
}

export default App;
