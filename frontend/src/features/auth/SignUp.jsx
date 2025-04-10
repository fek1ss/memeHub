import { useState } from 'react';
import styles from '../../styles/auth.module.css';
<<<<<<< HEAD
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async e => {
    e.preventDefault();

    const { username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    const checkRes = await fetch(
      `http://localhost:8080/users?username=${username}`,
    );
    const existingUsers = await checkRes.json();

    if (existingUsers.length > 0) {
      setMessage('User already exists');
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      role_id: 3,
    };

    await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    setFormData({ username: '', password: '', confirmPassword: '' });
    navigate('/login');
  };

  return (
    <div className={styles.auth}>
      <form onSubmit={handleSubmit} className={styles.form_auth}>
        <h1>Sign Up</h1>
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
=======
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
>>>>>>> origin/main
  );
};

export default SignUp;
