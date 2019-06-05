jest.mock('@/utils/media');

import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockAppVersion } from '@/mocks';
import { mediaQuery } from '@/utils/media';

import DetailsView from './view';
import { AppVersionDetails } from './';

describe('AppVersionDetailsView', () => {
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
});

describe('AppVersionDetails', () => {
  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<AppVersionDetails appVersion={mockAppVersion} updateAppVersion={jest.fn()} />));
    expect(tree).toMatchSnapshot();
  });

  it('triggers a save', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const mockUpdateAppVersion = jest.fn();
    const tree = mount(<AppVersionDetails appVersion={mockAppVersion} updateAppVersion={mockUpdateAppVersion} />);

    tree
      .find('button')
      .first()
      .simulate('click');

    expect(mockUpdateAppVersion).toHaveBeenCalled();
  });

  it('triggers a state update when a form item is modified', () => {
    const tree = mount(<AppVersionDetails appVersion={mockAppVersion} updateAppVersion={jest.fn()} />);

    const key = 'description',
      value = 'Such description! wow';

    tree.find('form').simulate('change', { target: { name: key, value } });
    expect(tree.state('updatedAppVersion')).toEqual({
      ...mockAppVersion,
      [key]: value
    });
  });
});
