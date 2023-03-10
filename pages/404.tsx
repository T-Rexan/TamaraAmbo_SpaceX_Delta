import Image from 'next/image';

import styles from './404.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.center}>
      <Image
        priority
        src={'/404-not-found.jpg'}
        alt="Image of a 404 error with a picture of an astronaut"
        height={500}
        width={500}
      />
    </div>
  );
};

export default NotFoundPage;
