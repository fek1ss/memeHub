import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import MemeList from './../../components/MemeList/MemeList';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import usersRequest from '../../features/users/usersAPI';
import memeRequest from '../../features/memes/memeAPI';
import API_URL from './../../features/baseUrl';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) {
      memeRequest()
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

  return (
    <div className={styles.home}>
      {user ? (
        <MemeList
          cards={cards}
          users={users}
          handleDelete={handleDelete}
        />
      ) : (
        <p>
          Please <Link to="/login">log in</Link> to access more
          features.
        </p>
      )}
    </div>
  );
};

export default Home;
