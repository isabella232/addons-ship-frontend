import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import DevicesView from './view';
import { AppVersionDevices } from './';
import { mockTestDevices, mockApp } from '@/mocks';

describe('AppVersion', () => {
  it('renders the details tab correctly with UDID', () => {
    const tree = toJSON(shallow(<DevicesView isLoading={false} projectType="ios" devices={mockTestDevices} />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the details tab correctly with UUID', () => {
    const tree = toJSON(shallow(<DevicesView isLoading={false} projectType="android" devices={mockTestDevices} />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the details tab correctly with device ID', () => {
    const tree = toJSON(shallow(<DevicesView isLoading={false} projectType="other" devices={mockTestDevices} />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the loading skeleton when loading', () => {
    const tree = toJSON(shallow(<DevicesView isLoading={true} projectType="ios" devices={mockTestDevices} />));
    expect(tree).toMatchSnapshot();
  });

  it('AppVersionDevices', () => {
    const tree = toJSON(
      shallow(
        <AppVersionDevices
          isLoading={false}
          app={mockApp}
          testDevices={mockTestDevices}
          fetchTestDevices={jest.fn() as any}
        />
      )
    );
    expect(tree).toMatchSnapshot();
  });
});
