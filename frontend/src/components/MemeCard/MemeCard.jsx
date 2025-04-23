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

  const currentMeme = {
    id,
    title,
    image_url,
    created_at,
    creator_id,
  };

  return (
    <div className={styles.memCard}>
      {(user.role === 'admin' ||
        location.pathname === '/profile') && (
        <div className={styles.headerRow}>
          <OptionsMenu
            onDelete={handleDelete}
            memeId={id}
            meme={currentMeme}
          />
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
          <button onClick={() => handleDelete(id)} className={styles.btn_delete}>delete</button>
        </div>
      </div>

      <div className={styles.panel}>
        {isOpen && <CommentSection mememId={id} />}
      </div>
    </div>
  );
};

export default MemeCard;
