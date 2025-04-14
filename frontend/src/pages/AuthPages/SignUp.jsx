import { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { registerRequest } from '../../services/authAPI';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async e => {
    e.preventDefault();

    const { username, password, confirmPassword } = formData;

    const response = await registerRequest({
      username,
      password,
      confirmPassword,
    });

    if (response.ok) {
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
      });
      setMessage(
        `Registration was successful, please log in to your account.`,
      );
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className={styles.auth}>
      <form onSubmit={handleRegister} className={styles.form_auth}>
        <h1 className={styles.auth_h1}>Sign Up</h1>
        <input
          className={styles.auth_inp}
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className={styles.auth_inp}
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className={styles.auth_inp}
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button className={styles.btn_yelow}>Sign Up</button>
        <p className="error">{message}</p>
      </form>
    </div>
  );
};

export default SignUp;
