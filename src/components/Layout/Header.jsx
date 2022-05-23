import { Link } from 'react-router-dom';
import { useAuth, useUser } from '../../context/UserProvider';
import styles from './Header.css';

export default function Header() {
  const user = useUser();
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">💬 Simple Chat</Link>
      </h1>
      <aside>
        {user?.email ? (
          <>
            <p>Signed in as {user.email}</p>
            <p>
              <button onClick={() => logout()}>Sign Out</button>
            </p>
          </>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
      </aside>
    </header>
  );
}
