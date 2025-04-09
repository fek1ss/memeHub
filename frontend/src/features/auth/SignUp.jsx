import styles from '../../styles/auth.module.css';

const SignUp = () => {
  return (
    <div className={styles.auth}>
      <form action="submit" className={styles.form_auth}>
        <input
          className={styles.auth_inp}
          type="text"
          placeholder="name: "
        />
        <input
          className={styles.auth_inp}
          type="email"
          placeholder="email: "
        />
        <input
          className={styles.auth_inp}
          type="password"
          placeholder="password: "
        />
        <input
          className={styles.auth_inp}
          type="password"
          placeholder="confirm password: "
        />
        <button className={styles.btn_yelow}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
