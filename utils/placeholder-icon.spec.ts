jest.mock('@/config', () => ({
  placeholderIcons: {
    android: 'mock-android.png',
    other: 'mock-other.png'
  }
}));

import { ProjectType } from '@/models/app';

import { getIcon } from './placeholder-icon';

describe('getIcon', () => {
  beforeAll(() => {
    global.Math.random = () => 0.123;
  });

  test('with appIcon set', () => {
    expect(getIcon('http://some.url/avatar.jpg')).toBe('http://some.url/avatar.jpg?1f7ced916872b');
  });

  test('without appicon and valid project type', () => {
    expect(getIcon(undefined, 'android')).toBe('mock-android.png?1f7ced916872b');
  });

  test('without appicon and other project type', () => {
    expect(getIcon(undefined, 'tamagotchi' as ProjectType)).toBe('mock-other.png?1f7ced916872b');
  });
});
