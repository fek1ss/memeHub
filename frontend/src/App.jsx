import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from '../src/features/auth/Login';
import SignUp from '../src/features/auth/SignUp';
import AuthContainer from '../src/features/auth/AuthContainer';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

const App = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <BrowserRouter>
      {user && <NavBar />}
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
