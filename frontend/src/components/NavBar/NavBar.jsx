import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './../../reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link> | &nbsp;
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link> | &nbsp;
          <Link to="/products">Products</Link> | &nbsp;
          <Link to="/orders">Orders</Link> | &nbsp;
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
