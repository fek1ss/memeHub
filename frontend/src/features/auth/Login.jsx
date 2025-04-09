import { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../reducers/AuthReducer';
import { loginRequest } from './authAPI';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    const response = await loginRequest({ username, password });

    if (response.ok) {
      dispatch(
        login({
          user: response.user,
          token: response.token,
        }),
      );
      navigate('/dashboard');
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className={styles.auth}>
      <form onSubmit={handleLogin} className={styles.form_auth}>
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
        {message}
        <button type="submit" className={styles.btn_green}>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;

// ==== for backend
// import { useState } from 'react';
// import styles from '../../styles/auth.module.css';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { login } from './authSlice';
// import { loginRequest } from './authAPI';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginRequest({ username, password });

//       if (response.data && response.token) {
//         dispatch(login({ user: response.data, token: response.token }));
//         navigate('/dashboard');
//       } else {
//         setMessage(response.message || 'Invalid credentials');
//       }
//     } catch (err) {
//       setMessage('Server error');
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className={styles.form_auth}>
//       <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//       {message && <p>{message}</p>}
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
