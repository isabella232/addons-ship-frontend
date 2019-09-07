import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import Banner from './Banner';

describe('Banner', () => {
  it('renders without errors', () => {
    const tree = mountToJson(mount(<Banner startColor="red" endColor="blue" />));
    expect(tree).toMatchSnapshot();
  });
});
