import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentSection from '../CommentSection/CommentSection';
import OptionsMenu from '../../components/OptionsMenu';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import {
  addLike,
  deleteLike,
  getLikes,
} from './../../services/likeService';

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
  const [isLike, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likeId, setLikeId] = useState(null);

  const currentMeme = {
    id,
    title,
    image_url,
    created_at,
    creator_id,
  };

  // Получить все лайки мема
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await getLikes(id);
      if (response.ok) {
        setLikesCount(response.likes.length);
        const userLiked = response.likes.some(
          like => like.user_id === user.id,
        );
        setIsLike(userLiked);
      }
    };

    fetchLikes();
  }, [id, user.id]);

  const handleLike = async () => {
    try {
      const newLike = {
        user_id: user.id,
        meme_id: id,
      };
      const response = await addLike(newLike);
      if (response.ok && response.data) {
        setIsLike(true);
        setLikeId(response.data.id); // предполагаем, что сервер возвращает созданный like с id
        setLikesCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Ошибка при добавлении лайка:', error);
    }
  };

  const handleDeleteLike = async () => {
    if (!likeId) return;
    try {
      await deleteLike(likeId);
      setIsLike(false);
      setLikeId(null);
      setLikesCount(prev => prev - 1);
    } catch (error) {
      console.error('Ошибка при удалении лайка:', error);
    }
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

          {isLike ? (
            <FaHeart onClick={handleDeleteLike} />
          ) : (
            <FaRegHeart
              className={styles.like}
              onClick={handleLike}
            />
          )}

          <span>{likesCount}</span>

          {location.pathname === '/' && user.role === 'moderator' && (
            <button
              onClick={() => handleDelete(id)}
              className={styles.btn_delete}
            >
              delete
            </button>
          )}
        </div>
      </div>

      <div className={styles.panel}>
        {isOpen && <CommentSection mememId={id} />}
      </div>
    </div>
  );
};

export default MemeCard;
