import { Redirect, Route, Switch } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';
import Header from './components/Layout/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Auth from './views/Auth/Auth';
import Chat from './views/Chat/Chat';
import './App.css';

export default function App() {
  return (
    <UserProvider>
      <Header />
      <Switch>
        <PrivateRoute path="/chat">
          <Chat />
        </PrivateRoute>
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/register">
          <Auth isSigningUp />
        </Route>
        <Route exact path="/">
          <Redirect to="/chat" />
        </Route>
      </Switch>
    </UserProvider>
  );
}
