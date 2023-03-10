import SpaceXLogo from '../../../public/SpaceX_Logo_Black.svg';
import ToggleButton from '../toggle';
import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.icon}>
          <SpaceXLogo />
        </span>
        <ToggleButton />
      </div>
    </header>
  );
}

export default Header;
