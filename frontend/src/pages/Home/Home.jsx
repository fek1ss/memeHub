import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import MemeList from './../../components/MemeList/MemeList';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:8080/memes')
        .then(res => res.json())
        .then(data => {
          setCards(data);
          console.log('cards: ', cards);
        });

      fetch('http://localhost:8080/users')
        .then(res => res.json())
        .then(data => setUsers(data));
    }
  }, []);
  return (
    <div className={styles.home}>
      {user ? (
        <MemeList cards={cards} users={users} />
      ) : (
        <>
          <p>
            Please <Link to="/login">log in</Link> to access more
            features.
          </p>
        </>
      )}
    </div>
  );
};

export default Home;
