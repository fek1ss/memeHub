import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Login from './Login';
import SignUp from './SignUp';
import styles from '../../styles/auth.module.css';
// import { useSelector } from 'react-redux';

const AuthFlipContainer = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  // const user = useSelector(state => state.auth.user);

  return (
    <div className={styles.auth}>
      <div className={styles.auth_switcher}>
        <button
          onClick={() => setIsLoginView(true)}
          disabled={isLoginView}
        >
          Login
        </button>
        <button
          onClick={() => setIsLoginView(false)}
          disabled={!isLoginView}
        >
          Sign Up
        </button>
      </div>

      <div className="flip-wrapper" style={{ perspective: '1000px' }}>
        <AnimatePresence mode="wait">
          {isLoginView ? (
            <motion.div
              key="login"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Login />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <SignUp />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthFlipContainer;
