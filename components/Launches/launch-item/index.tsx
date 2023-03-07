import Image from 'next/legacy/image';
import Link from 'next/link';
import { FC } from 'react';

import Card from '@/components/ui/card';

import styles from './launch-item.module.scss';

type LaunchItemProps = {
  id: string;
  name: string;
  img: string;
  details: string;
};

const LaunchItem: FC<LaunchItemProps> = ({ id, name, img, details }) => {
  return (
    <Card>
      <div className={styles.grid}>
        <Image
          src={img || '/no-image.png'}
          alt={name}
          width={500}
          height={500}
          layout="responsive"
        />
        <h1>{name}</h1>
        <p className={styles.details}>{details}</p>
        <Link href={`/${id}`}>Learn more</Link>
      </div>
    </Card>
  );
};
export default LaunchItem;
