import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { RequestError } from '@/models/errors';

import { AppContent } from './content';

describe('AppContent', () => {
  it('renders correclty without errors', () => {
    const tree = shallowToJson(shallow(<AppContent>Boaty McBoatface</AppContent>));
    expect(tree).toMatchSnapshot();
  });

  it('renders an error page', () => {
    const tree = shallowToJson(shallow(<AppContent error={new RequestError(404, 'Not Found')}>hidden</AppContent>));
    expect(tree).toMatchSnapshot();
  });
});
