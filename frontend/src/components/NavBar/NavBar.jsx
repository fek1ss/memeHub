import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './../../reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const NavBar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.link}>
        Home
      </Link>{' '}
      &nbsp;
      {user ? (
        <>
          <button
            onClick={() => navigate('/profile')}
            className={styles.account}
          >
            profile
          </button>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
