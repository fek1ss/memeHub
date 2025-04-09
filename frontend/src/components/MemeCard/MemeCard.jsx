import styles from './styles.module.css';

const MemeCard = () => {
  return (
    <div className={styles.memCard}>
      <img src="" alt="" />
      <p></p>
      <div className={styles.panel}>
        <div className={styles.likes}></div>
        <div className={styles.comments}></div>
      </div>
    </div>
  );
};

export default MemeCard;
