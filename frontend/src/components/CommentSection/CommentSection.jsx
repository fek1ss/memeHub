import { useEffect, useState } from 'react';
import {
  addComment,
  deleteComment,
  getComments,
  editComment,
} from '../../services/commentService';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { getAllUsers } from './../../services/userService';

const CommentSection = ({ mememId }) => {
  const user = useSelector(state => state.auth.user);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    getAllUsers()
      .then(res => {
        setUsers(res.users);
      })
      .catch(err => console.log('Error fetching comments:', err));

    getComments(mememId)
      .then(res => setComments(res.comments))
      .catch(err => console.log('Error fetching comments:', err));
  }, [comment]);

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

  const handleDeleteComment = async id => {
    console.log(id);
    try {
      await deleteComment(id);
      setComments(comments.filter(comm => comm.id !== id));
    } catch (error) {
      console.log('Error deleting meme: ', error);
    }
  };

  // Редактирование комментария

  const handleEditComment = async id => {
    try {
      const res = await editComment({
        id,
        comment: { text: editedText },
      });
      if (!res || res.ok === false) return;

      setComments(prev =>
        prev.map(comm =>
          comm.id === id ? { ...comm, text: editedText } : comm,
        ),
      );
      setEditingId(null);
      setEditedText('');
    } catch (err) {
      console.error('Edit error:', err);
    }
  };

  return (
    <div className="section">
      <div className={styles.comments}>
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
              <div className={styles.container}>
                <h5 className={styles.author_comment}>
                  {author ? author.username : 'Uknown author'}
                </h5>
                {(user.id === comment.author_id ||
                  user.role === 'admin' ||
                  user.role === 'moderator') && (
                  <div className={styles.edits}>
                    {(user.role === 'admin' ||
                      user.id === comment.author_id) && (
                      <p
                        onClick={() => {
                          setEditingId(comment.id);
                        }}
                      >
                        edit
                      </p>
                    )}
                    <p
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete
                    </p>
                  </div>
                )}
              </div>
              <p className={styles.commText}>
                {editingId === comment.id ? (
                  <>
                    <input
                      value={editedText}
                      onChange={e => setEditedText(e.target.value)}
                    />
                    <button
                      onClick={() => handleEditComment(comment.id)}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  comment.text
                )}
              </p>
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
        <button
          type="submit"
          onClick={handleAddComment}
          className={styles.btn}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
