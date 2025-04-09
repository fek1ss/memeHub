import styles from './styles.module.css';
import MemeCard from './../MemeCard/MemeCard';

const MemeList = ({ cards }) => {
  return (
    <div className={styles.memList}>
      {cards.map(card => (
        <MemeCard
          title={card.title}
          image_url={card.image_url}
          created_at={card.created_at}
          creator_id={card.creator_id}
        />
      ))}
    </div>
  );
};

export default MemeList;
