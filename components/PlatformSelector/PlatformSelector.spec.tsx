import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import PlatformSelector from '.';

describe('PlatformSelector', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<PlatformSelector platform="ios" onClick={() => {}} />));
    expect(tree).toMatchSnapshot();
  });

  describe('when clicking on the ios platform', () => {
    it('calls onclick with the right param', () => {
      const mockCallback = jest.fn();
      const tree = shallow(<PlatformSelector platform="android" onClick={mockCallback} />);
      tree
        .find('Base')
        .first()
        .simulate('click');
      expect(mockCallback).toHaveBeenCalledWith('ios');
    });
  });

  describe('when clicking on the android platform', () => {
    it('calls onclick with the right param', () => {
      const mockCallback = jest.fn();
      const tree = shallow(<PlatformSelector platform="ios" onClick={mockCallback} />);
      tree
        .find('Base')
        .last()
        .simulate('click');
      expect(mockCallback).toHaveBeenCalledWith('android');
    });
  });
});
