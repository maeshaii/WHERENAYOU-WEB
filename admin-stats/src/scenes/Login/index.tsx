import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../images/ctu.jpg';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add validation logic here
    navigate('/dashboard'); // Navigate to Dashboard on login
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <img src={background} alt="Background" style={styles.backgroundImage} />
      </div>

      <div style={styles.rightSection}>
        <button style={styles.backButton}>&larr;</button>

        <h2 style={styles.h2}>Welcome</h2>
        <h1 style={styles.h1}>Technologist</h1>
        <p style={styles.p}>Connect & Collaborate</p>

        <form style={styles.form} onSubmit={handleLogin}>
          <label htmlFor="ctu-id" style={styles.label}>CTU ID</label>
          <input
            type="text"
            id="ctu-id"
            placeholder="Enter your CTU ID"
            required
            style={styles.input}
          />

          <label htmlFor="birthdate" style={styles.label}>Birthdate</label>
          <input
            type="date"
            id="birthdate"
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Log In</button>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  leftSection: {
    width: '50%',
  },
  backgroundImage: {
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
  },
  rightSection: {
    width: '50%',
    backgroundColor: '#1e3a8a',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  h2: {
    margin: 0,
  },
  h1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  p: {
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  label: {
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    border: 'none',
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    color: '#1e3a8a',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: 10,
    width: '40%',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 24,
    color: 'white',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Login;
