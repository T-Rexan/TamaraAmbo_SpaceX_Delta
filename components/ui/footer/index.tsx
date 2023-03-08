import React from 'react';

import styles from './footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        Made by : &copy;
        <a href="https://www.linkedin.com/in/tamara-ambo-300b93188/">
          <b>Tamara Ambo</b>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
