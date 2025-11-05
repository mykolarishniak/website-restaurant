import React from 'react';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
}

export default LoginPage;
