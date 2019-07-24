jest.mock('@/services/ship-api');

import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { PageContext } from '@/models';
import shipApi from '@/services/ship-api';

import ConfirmEmail, { Props } from '.';

describe('Confirm Email', () => {
  const defaultProps: Props = {
    app: {
      appSlug: 'app-slug',
      title: 'The Best App Ever',
      plan: 'gold',
      avatarUrl: 'avatarl.url',
      projectType: 'ios'
    },
    appContact: {
      id: 'bit-bot',
      email: 'bit.bot@bitrise.io',
      isConfirmed: true,
      notificationPreferences: {
        newVersion: true,
        successfulPublish: true,
        failedPublish: true
      }
    }
  };

  describe('it renders without errors', () => {
    test('when it has everything loaded', () => {
      const tree = shallowToJson(shallow(<ConfirmEmail {...defaultProps} />));

      expect(tree).toMatchSnapshot();
    });

    test('when there was an error', () => {
      const tree = shallowToJson(shallow(<ConfirmEmail error="Ouchie!" />));

      expect(tree).toMatchSnapshot();
    });
  });

  describe('getInitialProps', () => {
    it('calls the API with the token', async () => {
      (shipApi.confirmEmail as jest.Mock).mockResolvedValueOnce(defaultProps);
      const token = 'this-is-a-confirmation-token';

      const props = await ConfirmEmail.getInitialProps(({ query: { token } } as any) as PageContext);

      expect(shipApi.confirmEmail).toHaveBeenCalledWith(token);
      expect(props).toEqual(defaultProps);
    });

    it('returns an error if the API had an issue', async () => {
      (shipApi.confirmEmail as jest.Mock).mockRejectedValueOnce('api had some issue');

      const props = await ConfirmEmail.getInitialProps(({ query: { token: 'whatever' } } as any) as PageContext);
      expect(props).toEqual({
        error: 'Failed to confirm email address'
      });
    });
  });

  test('componentDidMount reloads the page if it loaded incorrectly', () => {
    const { location } = (global as any).window as Window;
    location.reload = jest.fn();

    shallow(<ConfirmEmail />);

    expect(location.reload).toHaveBeenCalled();
  });
});
