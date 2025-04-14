import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import MemeList from './../../components/MemeList/MemeList';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMeme } from '../../services/memeService';
import { getAllMemes } from './../../services/memeService';
import { getAllUsers } from './../../services/userService';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) {
      getAllMemes()
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

  return (
    <div className={styles.home}>
      {user ? (
        <MemeList
          cards={cards}
          users={users}
          handleDelete={handleDelete}
        />
      ) : (
        <p className={styles.home_p}>
          Please <Link to="/login">log in</Link> to access more
          features.
        </p>
      )}
    </div>
  );
};

export default Home;
