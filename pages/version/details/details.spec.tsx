import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import DetailsView from './view';
import { AppVersionDetails } from './';
import { mockAppVersion } from '@/mocks';

describe('AppDetailsView', () => {
  it('renders the details view correctly', () => {
    const tree = toJSON(mount(<DetailsView appVersion={mockAppVersion} showTooltips />));
    expect(tree).toMatchSnapshot();
  });

  it('AppVersionDetails', () => {
    const tree = toJSON(shallow(<AppVersionDetails appVersion={mockAppVersion} />));
    expect(tree).toMatchSnapshot();
  });
});
