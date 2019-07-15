jest.mock('@/utils/media');
jest.mock('@/utils/device');
jest.mock('@/ducks/appVersion');
jest.mock('@/services/settings');

import { shallow, mount } from 'enzyme';
import toJSON, { shallowToJson } from 'enzyme-to-json';
import { mediaQuery } from '@/utils/media';
import { Activity } from '.';
import ActivityView from './view';
import { mockAppVersionEvents, mockFailedAppVersionEvent, mockFinishedAppVersionEvent, mockInProgressAppVersionEvent } from '@/mocks';

describe('ActivityView', () => {
  const defaultProps = {
    appVersionEvents: mockAppVersionEvents
  };

  describe('when viewed on desktop', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);
    });

    it('renders the details view correctly', () => {
      const tree = toJSON(mount(<ActivityView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when viewed on mobile', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);
    });

    it('renders the details view correctly', () => {
      const tree = toJSON(mount(<ActivityView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a test failed', () => {
    it('renders entry with download log button', () => {
      const tree = toJSON(mount(<ActivityView appVersionEvents={[mockFailedAppVersionEvent]} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a test is successful', () => {
    it('renders entry without download log button', () => {
      const tree = toJSON(mount(<ActivityView appVersionEvents={[mockFinishedAppVersionEvent]} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a test is in progress', () => {
    it('renders entry without download log button', () => {
      const tree = toJSON(mount(<ActivityView appVersionEvents={[mockInProgressAppVersionEvent]} />));
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('Activity', () => {
  const defaultProps = {
    appVersionEvents: mockAppVersionEvents
  };

  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<Activity {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });
});
