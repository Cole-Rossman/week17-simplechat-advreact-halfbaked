import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';

import styles from './UserForm.css';

export default function UserForm({ className = '', label, onSubmit }) {
  const {
    formState,
    formError,
    handleFormChange,
    setFormError,
    resetFormState,
  } = useForm({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formState;

    try {
      setFormError('');
      if (!email || password.length < 8)
        throw new Error(
          'An email and password (with 8+ characters) are required.'
        );
      setLoading(true);
      await onSubmit(email, password);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear the form whenever the label changes
    // eg. when switching from 'sign in' to 'sign up'
    resetFormState();
  }, [label]);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <fieldset className={styles.form}>
        <legend>{label}</legend>
        <section className={styles.formSection}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleFormChange}
          />
        </section>
        <section className={styles.formSection}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleFormChange}
          />
        </section>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : label}
        </button>
        {formError && <p className={styles.error}>{formError}</p>}
      </fieldset>
    </form>
  );
}
