import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import { RootState } from './store/store';
import { useSelector } from "react-redux"

function App() {

  const { loggedIn } = useSelector((state: RootState) => state.login);


  return (
    <Router>

        <Routes>
        <Route path="/login"  element={<LoginPage/>} />
        <Route path="/" element={<ProtectedRoute isAuthenticated={loggedIn} element={<Home/>} />}  />
        <Route path="*" element={<Navigate to="/login" />} />
          {/*

          <Route path="/search" component={SearchPage} />
          <Route path="/watchlist" component={WatchlistPage} /> */}
        </Routes>

    </Router>
  );
}


interface ProtectedRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
}

function ProtectedRoute(props: ProtectedRouteProps): JSX.Element {
  return props.isAuthenticated ? props.element : <Navigate to="/login" />;
};

export default App;