import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/AuthPages/Login';
import AuthContainer from './pages/AuthPages/AuthContainer';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import ListOfUsers from './pages/ListOfUsers/ListOfUsers';

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
        <Route
          path="/moder-dashboard"
          element={
            user && user.role === 'moderator' && <ListOfUsers />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
