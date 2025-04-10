import { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from './authAPI';
import bcrypt from 'bcryptjs';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // 10 — это "salt rounds"

      const response = await registerRequest({ username, password: hashedPassword });

      if (response.ok) {
        navigate('/login');
      } else {
        setMessage(response.message);
      }
    } catch (err) {
      console.error('Hashing error:', err);
      setMessage('Something went wrong');
    }
  };

  return (
      <div className={styles.auth}>
        <form onSubmit={handleSignUp} className={styles.form_auth}>
          <h1>Sign Up</h1>
          <input
              className={styles.auth_inp}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="username: "
              required
          />
          <input
              className={styles.auth_inp}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password: "
              required
          />
          <input
              className={styles.auth_inp}
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="confirm password: "
              required
          />
          {message}
          <button type="submit" className={styles.btn_yelow}>
            Sign Up
          </button>
        </form>
      </div>
  );
};

export default SignUp;
