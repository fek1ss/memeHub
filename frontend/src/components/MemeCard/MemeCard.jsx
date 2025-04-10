import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import API_URL from '../../features/baseUrl';
import { useLocation } from 'react-router-dom';

const MemeCard = ({
  title,
  image_url,
  created_at,
  creator_id,
  users,
  handleDelete,
  id,
}) => {
  const user = useSelector(state => state.auth.user);
  const creator = users.find(user => user.id === creator_id);
  const location = useLocation();

  return (
    <div className={styles.memCard}>
      <img src={image_url} alt="meme image" />
      <h3>{title}</h3>
      <p>{created_at}</p>
      <p>{creator ? creator.username : 'Unknown username'}</p>
      <div className={styles.panel}>
        <div className={styles.comments}></div>
      </div>
      {(user.role_id === 1 ||
        user.role_id === 2 ||
        location.pathname === '/profile') && (
        <button onClick={() => handleDelete(id)}>delete</button>
      )}
    </div>
  );
};

export default MemeCard;
