import styles from './styles.module.css';

const MemeCard = ({
  title,
  image_url,
  created_at,
  creator_id,
  users,
}) => {
  const creator = users.find(user => user.id === creator_id);

  return (
    <div className={styles.memCard}>
      <img src={image_url} alt="meme image" />
      <p>{creator}</p>
      <h3>{title}</h3>
      <p>{creator ? created_at.username : 'Unknown username'}</p>
      <div className={styles.panel}>
        <div className={styles.comments}></div>
      </div>
    </div>
  );
};

export default MemeCard;
