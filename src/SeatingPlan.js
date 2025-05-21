import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const SeatingPlan = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <div className="flex justify-between p-4 bg-gray-100">
        <span>Welcome, {user.username} ({user.role})</span>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>
      {/* seating layout goes here */}
    </div>
  );
};
