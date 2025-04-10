import styles from './styles.module.css';
import MemeList from './../../components/MemeList/MemeList';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import memeRequest from './../../features/memes/memeAPI';
import usersRequest from './../../features/users/usersAPI';
import API_URL from '../../features/baseUrl';

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

  useEffect(() => {
    if (user) {
      memeRequest(user.id)
        .then(response => {
          setCards(response.memes);
        })
        .catch(err => {
          console.error('Error fetching memes: ', err);
        });

      usersRequest()
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
    try {
      const response = await fetch(`${API_URL}/memes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) setCards(cards.filter(card => card.id !== id));
      else {
        alert('Failed to delete meme');
      }
    } catch (error) {
      console.error('Error deleting meme:', error);
    }
  };
  // ===============================================
  const handleFileChange = e => {
    setImage_url(e.target.value);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleAddMeme = async e => {
    e.preventDefault();
    if (!title || !image_url) {
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

    try {
      const memeResponse = await fetch(`${API_URL}/memes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meme),
      });

      if (!memeResponse.ok) {
        throw new Error('Failed to add meme');
      }

      updateList(meme);
      setMessage({
        error: false,
        value: 'Meme added successfully:',
      });
      setTimeout(() => {
        setMessage({
          error: false,
          value: '',
        });
      }, 2000);
    } catch (err) {
      setMessage({ error: true, value: `Server error: ${err}` });
    }
  };
  // =================
  // Обновление списка мемов
  const updateList = memList => {
    setCards(prev => [...prev, memList]);
  };

  return (
    <div className={styles.profile_page}>
      <form onSubmit={handleAddMeme} className={styles.addMem}>
        <input
          type="text"
          onChange={handleFileChange}
          placeholder="image mem: "
          className={styles.inp_profile}
        />
        <input
          type="text"
          onChange={handleTitleChange}
          placeholder="title mem: "
          className={styles.inp_profile}
        />
        <button type="submit" className={styles.btn}>
          Submit
        </button>
        <p>{message.value}</p>
      </form>
      <MemeList
        cards={cards}
        users={users}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default Profile;
