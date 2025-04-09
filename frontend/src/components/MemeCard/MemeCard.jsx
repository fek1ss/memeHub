import styles from './styles.module.css';

const MemeCard = ({ title, image_url, created_at, creator_id }) => {
  return (
    <div className={styles.memCard}>
      <img src={image_url} alt="meme image" />
      <p>{creator_id}</p>
      <h3>{title}</h3>
      <p>{created_at}</p>
      <div className={styles.panel}>
        <div className={styles.comments}></div>
      </div>
    </div>
  );
};

export default MemeCard;
