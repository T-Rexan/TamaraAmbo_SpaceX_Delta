import { FC } from 'react';

import Card from '@/components/ui/card';

type LaunchItemProps = { item: any };

const LaunchItem: FC<LaunchItemProps> = ({ item }) => {
  return <Card>{item.name}</Card>;
};
export default LaunchItem;
