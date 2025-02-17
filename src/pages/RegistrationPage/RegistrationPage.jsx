import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the custom hook for AuthContext
import styles from './RegistrationPage.module.css';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { register } from '../../api/auth';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useAuth(); // Use the custom hook to get setAuth
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // Reset any previous errors
    try {
      const data = await register({ name, email, password });
      setAuth({ token: data.token, isAuthenticated: true, user: data.user });
      console.log('Registered user name:', data.user.name);
      navigate('/calculator');
    } catch (err) {
      setError('Registration failed. Please try again.'); // Improved error message
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className={`${styles.container} ${styles.background}`}>
      <Header />
      <h2 className={styles.title}>REGISTER</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name *
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Email *
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Password *
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
        <div className={styles.buttonContainer}>
          <Button type="submit" text="Register" variant="colorButton" />
          <Button
            type="button"
            text="Log in"
            variant="whiteButton"
            onClick={handleLogin} // Use onClick instead of handlerFunction
          />
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
