jest.mock('@/utils/media');
jest.mock('@/utils/device');

import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockSettings, mockAppVersion } from '@/mocks';
import { mediaQuery } from '@/utils/media';

import GeneralView from './view';
import { General, State } from './';

describe('GeneralView', () => {
  const defaultProps = {
    maximumNumberOfCertificates: 30,
    appVersion: mockAppVersion,
    iosSettings: mockSettings.iosSettings,
    androidSettings: mockSettings.androidSettings,
    provProfiles: mockSettings.provProfiles,
    certificates: mockSettings.certificates,
    keystoreFiles: mockSettings.keystoreFiles,
    serviceAccountJsonFiles: mockSettings.serviceAccountJsonFiles,
    showTooltips: true,
    onSettingsPropertyChange: jest.fn(),
    onSelectedFileChange: jest.fn(),
    onCancel: jest.fn(),
    onSave: jest.fn()
  };

  describe('when viewed on desktop', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);
    });

    it('renders the view correctly', () => {
      const tree = toJSON(mount(<GeneralView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when viewed on mobile', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);
    });

    it('renders the view correctly', () => {
      const tree = toJSON(mount(<GeneralView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when there are no iOS settings', () => {
    it('does not render iOS settings section', () => {
      const tree = toJSON(
        mount(
          <GeneralView {...defaultProps} iosSettings={undefined} provProfiles={undefined} certificates={undefined} />
        )
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when there are no Android settings', () => {
    it('does not render Android settings section', () => {
      const tree = toJSON(
        mount(
          <GeneralView
            {...defaultProps}
            androidSettings={undefined}
            keystoreFiles={undefined}
            serviceAccountJsonFiles={undefined}
          />
        )
      );
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('General', () => {
  const defaultProps = {
    appVersion: mockAppVersion,
    settings: mockSettings,
    updateSettings: jest.fn() as any
  };

  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<General {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  it('triggers a save', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const mockUpdateSettings = jest.fn() as any;
    const tree = mount(<General {...defaultProps} updateSettings={mockUpdateSettings} />);

    tree
      .find('button')
      .last()
      .simulate('click');

    expect(mockUpdateSettings).toHaveBeenCalled();
  });

  it('triggers a state update when a form item is modified', () => {
    const tree = mount(<General {...defaultProps} />);

    tree
      .find('input[name="artifactExposingWorkflows"]')
      .first()
      .simulate('change', { target: { name: 'artifactExposingWorkflows', value: 'Primary' } });

    expect(tree.state('iosSettings')).toEqual({
      ...mockSettings.iosSettings,
      artifactExposingWorkflows: 'Primary'
    });
  });

  it('triggers a state reset when cancel is selected', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = mount(<General {...defaultProps} />);

    tree
      .find('input[name="artifactExposingWorkflows"]')
      .first()
      .simulate('change', { target: { name: 'artifactExposingWorkflows', value: 'Primary' } });
    tree
      .find('button')
      .first()
      .simulate('click');

    expect(tree.state('iosSettings')).toEqual(mockSettings.iosSettings);
  });
});
