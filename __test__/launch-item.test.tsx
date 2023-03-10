import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import LaunchItem from '../components/Launches/launch-item';
import styles from '../components/Launches/launch-item/launch-item.module.scss';

describe('LaunchItem component', () => {
  const props = {
    id: '1',
    name: 'Falcon 9',
    img: 'https://www.example.com/falcon9.jpg',
    details: 'Details about Falcon 9 launch',
    date: '2023-03-10',
  };

  it('should render with the correct props', () => {
    const { getByAltText, getByText } = render(<LaunchItem {...props} />);
    expect(getByAltText(props.name)).toBeInTheDocument();
    expect(getByText(props.name)).toBeInTheDocument();
    expect(getByText(props.date)).toBeInTheDocument();
    expect(getByText(props.details)).toBeInTheDocument();
    expect(getByText('Learn more')).toHaveAttribute('href', `/${props.id}`);
  });

  it('should render the Image component with correct props', () => {
    const { getByAltText } = render(<LaunchItem {...props} />);
    const image = getByAltText(props.name);
    expect(image).toHaveAttribute('src', props.img);
    expect(image).toHaveAttribute('width', '500');
    expect(image).toHaveAttribute('height', '500');
    expect(image).toHaveAttribute('layout', 'responsive');
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('importance', 'high');
  });

  it('should render with a Card component', () => {
    const { container } = render(<LaunchItem {...props} />);
    expect(container.firstChild).toHaveClass('card');
  });

  it('should render with the correct class names', () => {
    const { container } = render(<LaunchItem {...props} />);
    const grid = container.firstChild?.firstChild;
    expect(grid).toHaveClass(styles.grid);
    expect(grid?.firstChild).toHaveClass(styles.title);
    expect(grid?.childNodes[1]).toHaveClass(styles.date);
    expect(grid?.childNodes[2]).toHaveClass(styles.details);
    expect(grid?.lastChild).toHaveClass(styles.link);
  });
});
