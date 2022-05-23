import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserForm from '../../components/UserForm/UserForm';
import { useUser, useAuth } from '../../context/UserProvider';

import styles from './Auth.css';

export default function Auth({ isSigningUp = false }) {
  const user = useUser();
  const { login, register } = useAuth();

  const handleSubmit = async (email, password) => {
    try {
      isSigningUp
        ? await register(email, password)
        : await login(email, password);
    } catch (error) {
      throw error; // lets UserForm handle displaying the error
    }
  };

  if (user?.email) return <Redirect to="/chat" />;

  return (
    <section className={styles.auth}>
      <h2>{isSigningUp ? 'Welcome!' : 'Welcome back!'}</h2>
      <br />
      <UserForm
        onSubmit={handleSubmit}
        label={isSigningUp ? 'Sign Up' : 'Sign In'}
      />

      {isSigningUp ? (
        <p className={styles.subtext}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      ) : (
        <p className={styles.subtext}>
          Need an account? <Link to="/register">Sign Up</Link>
        </p>
      )}
    </section>
  );
}
