import { FC } from 'react';

interface CardProps {
  children: React.ReactNode;
}
const Card: FC<CardProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Card;
