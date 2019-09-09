import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Tag from '.';

describe('Tag', () => {
  test('simple', () => {
    const tree = shallowToJson(
      shallow(
        <Tag color="blue-3" textColor="white">
          Some text
        </Tag>
      )
    );
    expect(tree).toMatchSnapshot();
  });

  test('selected', () => {
    const tree = shallowToJson(
      shallow(
        <Tag color="blue-3" textColor="white" selected>
          Some text
        </Tag>
      )
    );
    expect(tree).toMatchSnapshot();
  });

  test('large', () => {
    const tree = shallowToJson(
      shallow(
        <Tag color="blue-3" textColor="white" large>
          Some text
        </Tag>
      )
    );
    expect(tree).toMatchSnapshot();
  });
});
