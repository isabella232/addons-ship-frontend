const mockSetState = jest.fn();
const mockUseEffect = jest.fn();

jest.mock('react', () => ({
  useState: (initial: any) => [initial, mockSetState],
  useEffect: (fn: Function) => mockUseEffect(fn)
}));

import { mediaQuery } from './media';

describe('mediaQuery', () => {
  const addListener = jest.fn();
  const mockMatchMedia = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', { value: mockMatchMedia });
  });

  it('checks if current media is a match', () => {
    mediaQuery('60rem', '30rem');
    const [[useEffectCall]] = mockUseEffect.mock.calls;

    mockMatchMedia
      .mockImplementationOnce(media => ({ matches: false, addListener, media }))
      .mockImplementationOnce(media => ({ matches: true, addListener, media }));
    useEffectCall();

    expect(mockSetState).toHaveBeenCalledTimes(2);
    expect(mockMatchMedia).toHaveBeenCalledTimes(2);
    expect(mockMatchMedia).toHaveBeenNthCalledWith(1, '(min-width: 60rem)');
    expect(mockMatchMedia).toHaveBeenNthCalledWith(2, '(min-width: 30rem)');

    mockSetState.mockClear();
    mockMatchMedia.mockClear();

    const [[addListenerHandler]] = addListener.mock.calls;
    addListenerHandler({ matches: false, media: '(min-width: 60rem)' });

    expect(mockMatchMedia).toHaveBeenCalledTimes(0);
    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledWith(false);
  });
});
