import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './../../reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
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
        <button
          onClick={handleLogout}
          className={`${styles.logout_btn} ${styles.btn}`}
        >
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <div className={styles.pr_cont}>
        <CgProfile
          onClick={() => navigate('/profile')}
          className={styles.profile}
        />
        <p className={styles.role}>{user.role}</p>
      </div>
    </nav>
  );
};

export default NavBar;
