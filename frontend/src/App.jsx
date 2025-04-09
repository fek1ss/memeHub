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
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <BrowserRouter>
      {
        user && (
          <NavBar />
        )
      }
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
