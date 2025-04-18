import { useEffect, useState } from 'react';
import {
  addComment,
  getComments,
} from '../../services/commentService';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { getAllUsers } from './../../services/userService';

const CommentSection = ({ mememId }) => {
  const user = useSelector(state => state.auth.user);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers()
      .then(res => {
        setUsers(res.users);
        console.log(users);
      })
      .catch(err => console.log('Error fetching comments:', err));

    getComments(mememId)
      .then(res => setComments(res.comments))
      .catch(err => console.log('Error fetching comments:', err));
  }, []);

  const updateComment = newComment => {
    setComments(prev => [...prev, newComment]);
  };

  const handleAddComment = async e => {
    e.preventDefault();

    const commentUser = {
      meme_id: mememId,
      author_id: user.id,
      text: comment,
      create_at: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    try {
      const res = await addComment(commentUser);
      if (!res.ok) {
        return;
      }
      updateComment(commentUser);
      setComment('');
    } catch (err) {
      console.log('server error: ', err);
    }
  };

  return (
    <div className="section">
      <div className="comments">
        {comments.map(comment => {
          const author = users.find(
            user => user.id === comment.author_id,
          );
          return (
            <div
              key={comment.id}
              className={
                comment.author_id === user.id
                  ? styles.myComment
                  : styles.otherComment
              }
            >
              <h5 className={styles.author_comment}>
                {author ? author.username : 'Uknown author'}
              </h5>
              <p>{comment.text}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.submit_comment}>
        <input
          className={styles.inp_comment}
          type="text"
          value={comment}
          placeholder="some comment..."
          onChange={e => setComment(e.target.value)}
        />
        <button type="submit" onClick={handleAddComment}>
          submit
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
