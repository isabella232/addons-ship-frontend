import { advanceTo, clear } from 'jest-date-mock';

import { dayInWords } from './time';

describe('dayInWords', () => {
  const now = new Date(2012, 7, 10, 8, 30, 15, 123);
  beforeEach(() => {
    advanceTo(now);
  });

  afterEach(() => {
    clear();
  });

  [
    { date: null, expectedWord: null },
    { date: new Date(2012, 7, 10, 8, 30, 10, 123), expectedWord: 'Today' },
    { date: new Date(2012, 7, 11, 12, 30, 15, 123), expectedWord: 'Tomorrow' },
    { date: new Date(2012, 9, 5, 12, 30, 15, 123), expectedWord: 'October 5' },
    { date: new Date(2013, 6, 31, 8, 30, 15, 123), expectedWord: 'July 31, 2013' },
    { date: new Date(2013, 7, 10, 8, 30, 10, 123), expectedWord: 'August 10, 2013' },
    { date: new Date(2013, 6, 31, 8, 30, 15, 123), expectedWord: 'July 31, 2013' },
    { date: new Date(2012, 7, 9, 12, 30, 15, 123), expectedWord: 'Yesterday' },
    { date: new Date(2012, 7, 1, 12, 30, 15, 123), expectedWord: 'August 1' },
    { date: new Date(2012, 6, 31, 8, 30, 15, 123), expectedWord: 'July 31' },
    { date: new Date(2011, 7, 10, 8, 30, 10, 123), expectedWord: 'August 10, 2011' },
    { date: new Date(2011, 6, 31, 8, 30, 15, 123), expectedWord: 'July 31, 2011' }
  ].forEach(({ date, expectedWord }) => {
    it(`returns '${expectedWord}'`, () => {
      expect(dayInWords(date)).toBe(expectedWord);
    });
  });
});
