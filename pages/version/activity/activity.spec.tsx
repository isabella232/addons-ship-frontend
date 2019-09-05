jest.mock('@/utils/media');
jest.mock('@/utils/device');
jest.mock('@/ducks/appVersion');
jest.mock('@/services/settings');

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { mediaQuery } from '@/utils/media';
import { Props as ActivityProps, Activity } from '.';
import ActivityView from './view';
import {
  mockAppVersionEvents,
  mockFailedAppVersionEvent,
  mockFinishedAppVersionEvent,
  mockInProgressAppVersionEvent,
  mockAppVersion
} from '@/mocks';

describe('ActivityView', () => {
  const defaultProps = {
    appVersionEvents: mockAppVersionEvents
  };

  describe('when viewed on desktop', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);
    });

    it('renders the details view correctly', () => {
      const tree = toJSON(shallow(<ActivityView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when viewed on mobile', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);
    });

    it('renders the details view correctly', () => {
      const tree = toJSON(shallow(<ActivityView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a test failed', () => {
    it('renders entry with download log button', () => {
      const tree = toJSON(shallow(<ActivityView appVersionEvents={[mockFailedAppVersionEvent]} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a test is successful', () => {
    it('renders entry without download log button', () => {
      const tree = toJSON(shallow(<ActivityView appVersionEvents={[mockFinishedAppVersionEvent]} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a test is in progress', () => {
    it('renders entry without download log button', () => {
      const tree = toJSON(shallow(<ActivityView appVersionEvents={[mockInProgressAppVersionEvent]} />));
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('Activity', () => {
  const defaultProps: ActivityProps = {
    appVersionEvents: mockAppVersionEvents,
    versionId: mockAppVersion.id,
    appVersion: mockAppVersion,
    cancelPollPublishStatus: jest.fn() as any,
    startPollPublishStatus: jest.fn() as any
  };

  beforeEach(() => {
    const { startPollPublishStatus, cancelPollPublishStatus } = defaultProps;

    (([startPollPublishStatus, cancelPollPublishStatus] as any) as jest.Mock[]).forEach(mock => mock.mockReset());
  });

  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<Activity {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('does not start polling if the appVersion is invalid', () => {
      const { startPollPublishStatus } = defaultProps;
      shallow(<Activity {...defaultProps} appVersion={null} />);

      expect(startPollPublishStatus).not.toHaveBeenCalled();
    });

    it('starts polling', () => {
      const { appVersion, startPollPublishStatus } = defaultProps;
      shallow(<Activity {...defaultProps} />);

      expect(startPollPublishStatus).toHaveBeenCalledWith(appVersion);
    });
  });

  it('stops polling', () => {
    const { cancelPollPublishStatus } = defaultProps;
    const wrapper = shallow(<Activity {...defaultProps} />);

    wrapper.unmount();
    expect(cancelPollPublishStatus).toHaveBeenCalled();
  });
});
