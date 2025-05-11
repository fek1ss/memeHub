import React from 'react';
import styles from './styles.module.css';
import MemeCard from './../MemeCard/MemeCard';
import { useSelector } from 'react-redux';
import BannedPage from '../BannedPage';

const MemeList = ({ cards, users, handleDelete }) => {
  const user = useSelector(state => state.auth.user);

  if (user?.isBanned === 'true') {
    return <BannedPage />;
  }

  return (
    <div className={styles.memList}>
      {cards.map(card => (
        <MemeCard
          key={card.id}
          title={card.title}
          image_url={card.image_url}
          created_at={card.created_at}
          creator_id={card.creator_id}
          users={users}
          id={card.id}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MemeList;
