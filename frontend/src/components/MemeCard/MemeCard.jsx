import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import CommentSection from '../CommentSection/CommentSection';
import OptionsMenu from '../../components/OptionsMenu';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.memCard}>
      {(user.role === 'admin' ||
        user.role === 'moderator' ||
        location.pathname === '/profile') && (
        <div className={styles.headerRow}>
          <OptionsMenu onDelete={handleDelete} memeId={id} />
        </div>
      )}

      <img src={image_url} alt="meme image" />
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.container}>
        <p className={styles.creater}>
          made by {creator ? creator.username : 'Unknown username'}
        </p>
        <p className={styles.created_at}>{created_at}</p>
        <div className={styles.comm_likes}>
          <span
            className={styles.comment}
            onClick={() => setIsOpen(!isOpen)}
          >
            💬
          </span>
          <span>👍</span>
        </div>
      </div>

      <div className={styles.panel}>
        {isOpen && <CommentSection mememId={id} />}
      </div>
    </div>
  );
};

export default MemeCard;
