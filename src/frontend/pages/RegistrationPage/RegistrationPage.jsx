import React from 'react';
import Header from '../../components/Header/Header';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.css';

function RegistrationPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <RegistrationForm />
      </main>
    </div>
  );
}

export default RegistrationPage;
