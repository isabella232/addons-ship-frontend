import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Tag from '.';
import MagicTag, { getStringSum } from './MagicTag';

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

  test('onClick', () => {
    const tree = shallowToJson(
      shallow(
        <Tag color="blue-3" textColor="white" onClick={jest.fn()}>
          Some text
        </Tag>
      )
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('MagicTag', () => {
  test('getStringSum', () => {
    expect(getStringSum('whatever')).toBe(870);
    expect(getStringSum('WhAtEvEr')).toBe(870);
    expect(getStringSum('sure thing')).toBe(1017);
  });

  test('simple', () => {
    const tree = shallowToJson(shallow(<MagicTag>magic ✨</MagicTag>));
    expect(tree).toMatchSnapshot();
  });
});
