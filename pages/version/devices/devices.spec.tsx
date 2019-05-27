import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import DevicesView from './view';
import { AppVersionDevices } from './';
import { mockTestDevices } from '@/mocks';

describe('AppVersion', () => {
  it('renders the details tab correctly', () => {
    const tree = toJSON(shallow(<DevicesView devices={mockTestDevices} />));
    expect(tree).toMatchSnapshot();
  });

  it('AppVersionDevices', () => {
    const tree = toJSON(shallow(<AppVersionDevices testDevices={mockTestDevices} />));
    expect(tree).toMatchSnapshot();
  });
});
