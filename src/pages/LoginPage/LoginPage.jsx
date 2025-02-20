import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LoginPage.module.css';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { login } from '../../api/auth';
import { useAuth } from '../../context/AuthContext'; // Ensure useAuth is correctly imported

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useAuth(); // Use useAuth to access setAuth
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/calculator';

  const handleLogin = async e => {
    e.preventDefault();
    setError(''); // Reset the error message
    try {
      const data = await login({ email, password });
      setAuth({ token: data.token, isAuthenticated: true, user: data.user });
      navigate(redirectTo);
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleRegister = () => {
    navigate('/registration');
  };

  return (
    <div className={`${styles.container} ${styles.background}`}>
      <Header />
      <h2 className={styles.title}>LOG IN</h2>
      <form onSubmit={handleLogin} className={styles.form}>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className={styles.buttonContainer}>
          <Button type="submit" text="Log in" variant="colorButton" />
          <Button
            type="button"
            text="Register"
            variant="whiteButton"
            onClick={handleRegister} // Use onClick instead of handlerFunction
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
