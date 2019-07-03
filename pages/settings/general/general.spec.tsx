jest.mock('@/utils/media');
jest.mock('@/utils/device');

import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockSettings, mockAppVersion } from '@/mocks';
import { mediaQuery } from '@/utils/media';

import GeneralView from './view';
import { General } from './';
import { ProvProfile, Certificate, KeystoreFile, ServiceAccountJsonFile, IosSettings, AndroidSettings } from '@/models';

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
    hasMounted: true,
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
      const tree = toJSON(shallow(<GeneralView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when viewed on mobile', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);
    });

    it('renders the view correctly', () => {
      const tree = toJSON(shallow(<GeneralView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when there are no iOS settings', () => {
    it('does not render iOS settings section', () => {
      const tree = toJSON(
        shallow(
          <GeneralView {...defaultProps} iosSettings={undefined} provProfiles={undefined} certificates={undefined} />
        )
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when there are no Android settings', () => {
    it('does not render Android settings section', () => {
      const tree = toJSON(
        shallow(
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

  ([
    ['ProvProfile', mockSettings.provProfiles, undefined, undefined, undefined],
    ['Certificate', undefined, mockSettings.certificates, undefined, undefined],
    ['KeystoreFile', undefined, undefined, mockSettings.keystoreFiles, undefined],
    ['ServiceAccountJsonFile', undefined, undefined, undefined, mockSettings.serviceAccountJsonFiles]
  ] as any).forEach(
    ([fileType, provProfiles, certificates, keystoreFiles, serviceAccountJsonFiles]: [
      string,
      ProvProfile[],
      Certificate[],
      KeystoreFile[],
      ServiceAccountJsonFile[]
    ]) => {
      describe('when a file is selected', () => {
        it('calls onSelectedFileChange with the file type and the file itself', () => {
          const mockOnSelectedFileChange = jest.fn() as any;
          const tree = mount(
            <GeneralView
              {...defaultProps}
              provProfiles={provProfiles}
              certificates={certificates}
              keystoreFiles={keystoreFiles}
              serviceAccountJsonFiles={serviceAccountJsonFiles}
              onSelectedFileChange={mockOnSelectedFileChange}
            />
          );

          tree.find('input[type="radio"]').forEach((radioInput, index) => {
            radioInput.simulate('change', { target: { checked: true } });

            const files = provProfiles || certificates || keystoreFiles || serviceAccountJsonFiles;

            expect(mockOnSelectedFileChange).toHaveBeenCalledWith(fileType, files[index]);
          });
        });
      });
    }
  );

  [
    ['appSku', 'iosSettings'],
    ['appleDeveloperAccountEmail', 'iosSettings'],
    ['appSpecificPassword', 'iosSettings'],
    ['artifactExposingWorkflows', 'androidSettings'],
    ['track', 'androidSettings']
  ].forEach(([inputName, settings]) => {
    describe(`when input ${inputName} is changing`, () => {
      it(`calls onSettingsPropertyChange with ${settings}, ${inputName} and the new value`, () => {
        const mockOnSettingsPropertyChange = jest.fn() as any;
        const tree = mount(<GeneralView {...defaultProps} onSettingsPropertyChange={mockOnSettingsPropertyChange} />);

        tree
          .find(`input[name="${inputName}"]`)
          .last()
          .simulate('change', { target: { value: 'something' } });

        expect(mockOnSettingsPropertyChange).toHaveBeenCalledWith(settings, inputName, 'something');
      });
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

  it('triggers a state update when selected prov profile changes', () => {
    const selectedProvProfile = (mockSettings.provProfiles as ProvProfile[])[0];

    const tree = shallow(<General {...defaultProps} />);
    (tree.instance() as General).onSelectedFileChange('ProvProfile', selectedProvProfile);

    expect((tree.state('iosSettings') as IosSettings).selectedProvProfile).toEqual(selectedProvProfile);
  });

  it('triggers a state update when selected certificate changes', () => {
    const selectedCertificate = (mockSettings.certificates as Certificate[])[0];

    const tree = shallow(<General {...defaultProps} />);
    (tree.instance() as General).onSelectedFileChange('Certificate', selectedCertificate);

    expect((tree.state('iosSettings') as IosSettings).selectedCertificate).toEqual(selectedCertificate);
  });

  it('triggers a state update when selected keystore file changes', () => {
    const selectedKeystoreFile = (mockSettings.keystoreFiles as KeystoreFile[])[0];

    const tree = shallow(<General {...defaultProps} />);
    (tree.instance() as General).onSelectedFileChange('KeystoreFile', selectedKeystoreFile);

    expect((tree.state('androidSettings') as AndroidSettings).selectedKeystoreFile).toEqual(selectedKeystoreFile);
  });

  it('triggers a state update when selected service account JSON file changes', () => {
    const selectedServiceAccountJsonFile = (mockSettings.serviceAccountJsonFiles as ServiceAccountJsonFile[])[0];

    const tree = shallow(<General {...defaultProps} />);
    (tree.instance() as General).onSelectedFileChange('ServiceAccountJsonFile', selectedServiceAccountJsonFile);

    expect((tree.state('androidSettings') as AndroidSettings).selectedServiceAccountJsonFile).toEqual(
      selectedServiceAccountJsonFile
    );
  });
});
