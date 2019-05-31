jest.mock('@/utils/media');

import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import DetailsView from './view';
import { AppVersionDetails } from './';
import { mockAppVersion } from '@/mocks';

import { mediaQuery } from '@/utils/media';

describe('AppDetailsView', () => {
  it('renders the details view correctly for desktop', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);

    const tree = toJSON(mount(<DetailsView appVersion={mockAppVersion} showTooltips />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the details view correctly for mobile', () => {
    (mediaQuery as jest.Mock).mockReturnValue([false]);
    const tree = toJSON(mount(<DetailsView appVersion={mockAppVersion} showTooltips />));
    expect(tree).toMatchSnapshot();
  });

  it('AppVersionDetails', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<AppVersionDetails appVersion={mockAppVersion} />));
    expect(tree).toMatchSnapshot();
  });
});
