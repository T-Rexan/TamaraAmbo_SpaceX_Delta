import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import LaunchItem from '../components/Launches/launch-item';

describe('LaunchItem', () => {
  it('renders with the correct props', async () => {
    const props = {
      id: '1',
      name: 'Falcon 9',
      img: 'https://www.example.com/falcon9.jpg',
      details: 'Details about Falcon 9 launch',
      date: '2023-03-10',
    };
    const { getByText, getByAltText } = render(<LaunchItem {...props} />);
    expect(getByText(props.name)).toBeInTheDocument();
    expect(getByText(props.date)).toBeInTheDocument();
    expect(getByText(props.details)).toBeInTheDocument();
    expect(getByAltText(props.name)).toBeInTheDocument();
  });
});
