// src/components/MemeList/MemeList.jsx

import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import MemeCard from './../MemeCard/MemeCard';
import { deleteMeme } from '../../features/memes/memeAPI.jsx';

const MemeList = ({ cards, refreshTrigger }) => {
  const [memes, setMemes] = useState(cards);

  useEffect(() => {
    setMemes(cards);  // обновляем мемы, когда приходит новый список
  }, [cards, refreshTrigger]); // зависимость от cards и refreshTrigger

  const handleDelete = async (id) => {
    const res = await deleteMeme(id);
    if (res.ok) {
      setMemes(prev => prev.filter(meme => meme.id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
      <div className={styles.memList}>
        {memes.map(card => (
            <div key={card.id}>
              <MemeCard
                  title={card.title}
                  image_url={card.image_url}
                  created_at={card.created_at}
                  creator_id={card.creator_id}
              />
              <button onClick={() => handleDelete(card.id)}>Delete</button>
            </div>
        ))}
      </div>
  );
};

export default MemeList;
