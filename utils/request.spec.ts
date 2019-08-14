jest.mock('node-fetch');

import fetch from 'node-fetch';

import * as request from './request';

describe('request', () => {
  const methodsWithoutBody = ['get', 'patch', 'del'],
    methodsWithBody = ['post', 'put', 'patch'],
    url = 'some.url',
    token = 'a-token',
    body = 'some-body';

  methodsWithoutBody.forEach(method => {
    test(method, async () => {
      ((fetch as unknown) as jest.Mock).mockResolvedValueOnce({ ok: true });
      await request[method](url, token);

      expect(fetch).toHaveBeenCalledWith(url, {
        method: (method === 'del' ? 'delete' : method).toUpperCase(),
        headers: {
          Authorization: token,
          Accept: 'application/json'
        }
      });
    });
  });

  methodsWithBody.forEach(method => {
    test(method, async () => {
      ((fetch as unknown) as jest.Mock).mockResolvedValueOnce({ ok: true });
      await request[method](url, token, body);

      expect(fetch).toHaveBeenCalledWith(url, {
        method: method.toUpperCase(),
        headers: {
          Authorization: token,
          Accept: 'application/json'
        },
        body
      });
    });
  });

  it('should throw an error for a bad request', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });

    await expect(request.get('some-url', 'a-token')).rejects.toThrowError('500: Internal Server Error');
  });

  it('should only include auth header when token was set', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValueOnce({ ok: true });

    const url = 'some.url',
      method = 'GET';
    await request.request({ url, method });

    expect(fetch).toHaveBeenCalledWith(url, { method, headers: { Accept: 'application/json' } });
  });
});
