import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Counter from '.';

describe('Counter', () => {
  it('renders correctly', () => {
    const comp = shallow(<Counter />);
    expect(toJSON(comp)).toMatchSnapshot();
  });

  it('updates the counter', () => {
    const comp = shallow(<Counter />);

    const button = comp.find('button');
    button.simulate('click');

    expect(toJSON(comp)).toMatchSnapshot();
  });
});
