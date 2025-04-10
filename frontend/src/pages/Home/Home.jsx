import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import MemeList from './../../components/MemeList/MemeList';

const Home = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/memes')
      .then(res => res.json())
      .then(data => setCards(data));
  }, []);
  return (
    <div className={styles.home}>
      <MemeList cards={cards} />
    </div>
  );
};

export default Home;
