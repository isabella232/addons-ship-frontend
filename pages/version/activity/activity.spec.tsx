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
    appVersionEvents: mockAppVersionEvents,
    isLoading: false
  };

  describe('when viewed on desktop', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);
    });

    it('renders the activity view correctly', () => {
      const tree = toJSON(shallow(<ActivityView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });

    it('renders the activity view correctly while loading', () => {
      const tree = toJSON(shallow(<ActivityView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when viewed on mobile', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);
    });

    it('renders the activity view correctly', () => {
      const tree = toJSON(shallow(<ActivityView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a test failed', () => {
    describe('with logs not available yet', () => {
      it('renders entry with disabled download log button', () => {
        const tree = toJSON(shallow(<ActivityView isLoading={false} appVersionEvents={[{...mockFailedAppVersionEvent, isLogAvailable: false}]} />));
        expect(tree).toMatchSnapshot();
      });
    });

    describe('with logs available', () => {
      it('renders entry with download log button', () => {
        const tree = toJSON(shallow(<ActivityView isLoading={false} appVersionEvents={[mockFailedAppVersionEvent]} />));
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('when a test is successful', () => {
    it('renders entry without download log button', () => {
      const tree = toJSON(shallow(<ActivityView isLoading={false} appVersionEvents={[mockFinishedAppVersionEvent]} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a test is in progress', () => {
    it('renders entry without download log button', () => {
      const tree = toJSON(
        shallow(<ActivityView isLoading={false} appVersionEvents={[mockInProgressAppVersionEvent]} />)
      );
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('Activity', () => {
  const defaultProps: ActivityProps = {
    appSlug: 'an-app-slug',
    isLoading: false,
    appVersionEvents: mockAppVersionEvents,
    versionId: mockAppVersion.id,
    fetchAppVersionEvents: jest.fn() as any,
    cancelPollPublishStatus: jest.fn() as any,
    startPollPublishStatus: jest.fn() as any
  };

  beforeEach(() => {
    const { startPollPublishStatus, cancelPollPublishStatus, fetchAppVersionEvents } = defaultProps;

    (([startPollPublishStatus, cancelPollPublishStatus, fetchAppVersionEvents] as any) as jest.Mock[]).forEach(mock =>
      mock.mockReset()
    );
  });

  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<Activity {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when loading', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<Activity {...defaultProps} isLoading />));
    expect(tree).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('starts polling, fetches events', () => {
      const { appSlug, versionId, startPollPublishStatus } = defaultProps;
      shallow(<Activity {...defaultProps} />);

      expect(startPollPublishStatus).toHaveBeenCalledWith({ appSlug, id: versionId });
    });
  });

  it('stops polling', () => {
    const { cancelPollPublishStatus } = defaultProps;
    const wrapper = shallow(<Activity {...defaultProps} />);

    wrapper.unmount();
    expect(cancelPollPublishStatus).toHaveBeenCalled();
  });
});
