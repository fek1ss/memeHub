import styles from './styles.module.css';
import MemeList from './../../components/MemeList/MemeList';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getAllMemes,
  createMeme,
} from './../../services/memeService';
import { getAllUsers } from './../../services/userService';
import { deleteMeme } from '../../services/memeService';
import EditMemeModal from '../../components/EditMemeModal/EditMemeModal';

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState('');
  const [image_url, setImage_url] = useState(null);
  const [message, setMessage] = useState({
    error: false,
    value: '',
  });
  const isEditModal = useSelector(
    state => state.selectedMeme.isEditModal,
  );
  const handleFileChange = e => {
    setImage_url(e.target.value);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleUpdateList = updated => {
    setCards(prev =>
      prev.map(card => (card.id === updated.id ? updated : card)),
    );
  };

  useEffect(() => {
    if (user) {
      getAllMemes(user.id)
        .then(response => {
          setCards(response.memes);
        })
        .catch(err => {
          console.error('Error fetching memes: ', err);
        });

      getAllUsers()
        .then(response => {
          setUsers(response.users);
        })
        .catch(err => {
          console.error('Error fetching users: ', err);
        });
    } else {
      console.log('User is not logged in');
    }
  }, [user]);

  // ===============================================
  // функция удаления мема
  const handleDelete = async id => {
    if (confirm('Are you than you want to delete this meme?')) {
      try {
        await deleteMeme(id);
        setCards(cards.filter(card => card.id !== id));
      } catch (error) {
        console.error('Error deleting meme:', error);
      }
    } else {
      console.log('the user canceled the removal of the meme');
    }
  };
  // ===============================================

  const handleAddMeme = async e => {
    e.preventDefault();
    if (!image_url) {
      setMessage({
        error: true,
        value: 'Please provide title or image mem',
      });
      return;
    }

    const meme = {
      title,
      image_url,
      created_at: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      creator_id: user.id,
    };

    const res = await createMeme(meme);
    if (!res.ok) {
      setMessage({
        error: res.ok,
        value: res.message,
      });
    }
    updateList(meme);
    setTitle('');
    setImage_url('');
    setMessage({
      error: res.ok,
      value: res.message,
    });
    setTimeout(() => {
      setMessage({
        error: false,
        value: '',
      });
    }, 1000);
  };
  // =================
  // Обновление списка мемов
  const updateList = memList => {
    setCards(prev => [...prev, memList]);
  };

  return (
    <div className={styles.profile_page}>
      <h1 className={styles.welcome}>Welcome {user.username}</h1>
      <form onSubmit={handleAddMeme} className={styles.addMem}>
        <input
          type="text"
          onChange={handleFileChange}
          placeholder="Link image mem: "
          value={image_url}
          className={styles.inp_profile}
        />
        <input
          type="text"
          onChange={handleTitleChange}
          placeholder="title mem: "
          value={title}
          className={styles.inp_profile}
        />
        <button type="submit" className={styles.btn}>
          Submit
        </button>
        <p className={message.error ? styles.error : styles.access}>
          {message.value}
        </p>
      </form>
      <MemeList
        cards={cards}
        users={users}
        handleDelete={handleDelete}
      />
      {isEditModal && <EditMemeModal onUpdate={handleUpdateList} />}
    </div>
  );
};
export default Profile;
