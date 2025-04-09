import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {
  const user = useSelector(state => state.auth.user);

  return (
    <div>
      <h1>Dashboard</h1>

      {user && user.role === 'admin' ? (
        <Link to="/add-order">
          <button>Place an Order</button>
        </Link>
      ) : (
        <p>Welcome to Dashboard</p>
      )}
    </div>
  );
}

export default Dashboard;
