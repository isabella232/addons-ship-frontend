jest.mock('node-fetch');

import fetch from 'node-fetch';

import * as request from './request';

describe('request', () => {
  const methodsWithoutBody = ['get', 'patch', 'del'],
    methodsWithBody = ['post', 'put'],
    url = 'some.url',
    token = 'a-token',
    body = 'some-body';

  methodsWithoutBody.forEach(method => {
    test(method, async () => {
      await request[method](url, token);

      expect(fetch).toHaveBeenCalledWith(url, {
        method: method === 'del' ? 'delete' : method,
        headers: {
          Authorization: token
        }
      });
    });
  });

  methodsWithBody.forEach(method => {
    test(method, async () => {
      await request[method](url, token, body);

      expect(fetch).toHaveBeenCalledWith(url, {
        method,
        headers: {
          Authorization: token
        },
        body
      });
    });
  });
});
