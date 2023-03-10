import { FC } from 'react';

import styles from './error.module.scss';

interface ErrorProps {
  children: React.ReactNode;
}

const Error: FC<ErrorProps> = ({ children }) => {
  return <div className={styles.alert}>{children}</div>;
};

export default Error;
