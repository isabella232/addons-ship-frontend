import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Error from '.';

describe('_error', () => {
  describe('renders ok', () => {
    [404, 500, 420, null].forEach(statusCode => {
      test(`when status code is ${statusCode}`, () => {
        const tree = shallowToJson(shallow(<Error statusCode={statusCode} />));
        expect(tree).toMatchSnapshot();
      });
    });
  });

  test('getInitialProps', () => {
    expect(Error.getInitialProps({ res: { statusCode: 123 }, err: { statusCode: 456 } } as any)).toEqual({
      statusCode: 123
    });

    expect(Error.getInitialProps({ err: { statusCode: 456 } } as any)).toEqual({
      statusCode: 456
    });

    expect(Error.getInitialProps({} as any)).toEqual({
      statusCode: null
    });
  });
});
