import Image from 'next/legacy/image';

import ToggleButton from '../toggle';
import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Image
          src={'/SpaceX_Logo_Black.png'}
          alt="SpaceX logo"
          objectFit="contain"
          height={50}
          width={150}
        />
        <ToggleButton />
      </div>
    </header>
  );
}

export default Header;
