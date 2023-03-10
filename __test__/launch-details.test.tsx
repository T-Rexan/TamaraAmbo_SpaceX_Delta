// eslint-disable-next-line simple-import-sort/imports
import { render } from '@testing-library/react';

import LaunchDetails from '../components/SingleLaunch/launch-details';
// eslint-disable-next-line unused-imports/no-unused-imports
import RocketInformation from '@/components/SingleLaunch/rocket-information';

jest.mock('../components/SingleLaunch/rocket-information', () => ({
  __esModule: true,
  default: () => <div>Mock RocketInformation</div>,
}));

describe('LaunchDetails', () => {
  const defaultProps = {
    rocketId: 'rocketId',
    rocketName: 'rocketName',
    rocketType: 'rocketType',
    name: 'Test Launch',
    links: {
      video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      article_link: 'https://www.test.com',
      wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_CRS-30',
    },
    details: 'Test Launch Details',
    date: '2022-03-09T12:00:00.000Z',
    success: true,
  };

  it('renders launch details correctly', () => {
    const { getByText } = render(<LaunchDetails {...defaultProps} />);

    expect(getByText('Test Launch')).toBeInTheDocument();
    expect(getByText('Launch Date: Mar 9, 2022, 12:00 PM')).toBeInTheDocument();
    expect(
      getByText('Mission details: Test Launch Details'),
    ).toBeInTheDocument();
    expect(getByText('Success')).toBeInTheDocument();
  });
});
