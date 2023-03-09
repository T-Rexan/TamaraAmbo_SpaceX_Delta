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
  date: string;
};

const LaunchItem: FC<LaunchItemProps> = ({ id, name, img, details, date }) => {
  return (
    <Card>
      <div className={styles.grid}>
        <Image
          src={img}
          alt={name}
          width={500}
          height={500}
          layout="responsive"
          priority
        />
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.date}>{date}</p>
        <p className={styles.details}>{details}</p>
        <Link className={styles.link} href={`/${id}`}>
          Learn more
        </Link>
      </div>
    </Card>
  );
};
export default LaunchItem;
