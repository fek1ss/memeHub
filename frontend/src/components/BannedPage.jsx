import styles from './MemeList/styles.module.css';

const BannedPage = () => {
  return (
    <div className={styles.bannedPage}>
      <div className={styles.bannedContent}>
        <h1 className={styles.bannedTitle}>You are banned</h1>
        <p className={styles.bannedText}>
          We're sorry, but your account has been banned. You cannot
          view memes.
        </p>
      </div>
    </div>
  );
};

export default BannedPage;
