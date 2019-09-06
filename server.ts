import * as next from 'next';
import * as express from 'express';
import fetch from 'node-fetch';
import { pick } from 'lodash';

import { AppVersionPageQuery } from './models';
import { AppSettingsPageQuery } from './models/settings';

const shipApiUrl = process.env.SHIP_API_URL || 'http://localhost:3003';

const port = parseInt(<string>process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/favicon.ico', (_req, res) => res.redirect('/static/icons/favicon.ico'));

  server.get('/', (req, res) => app.render(req, res, '/', req.params));

  const appPath = '/apps/:appSlug';
  server.get(appPath, (req, res) => app.render(req, res, '/app', { ...req.params, ...req.query }));

  const appVersionPath = `${appPath}/versions/:versionId`;

  server.get(`${appVersionPath}/public`, (req, res) =>
    app.render(req, res, '/version', { ...req.params, isPublic: 'public' } as AppVersionPageQuery)
  );

  server.get(`${appVersionPath}/:selectedTab?`, (req, res) =>
    app.render(req, res, '/version', req.params as AppVersionPageQuery)
  );

  server.get(`${appPath}/settings/:selectedTab?`, (req, res) =>
    app.render(req, res, '/settings', req.params as AppSettingsPageQuery)
  );

  server.all(`/api/resources`, async ({ query, headers, method }, res) => {
    const { path } = query;

    if (!path) {
      throw new Error('Missing query param `path`');
    }

    const fullUrl = `${shipApiUrl}/resources/${path}`,
      safeHeaders = pick(headers as { [key: string]: string }, [
        'authorization',
        'accept',
        'accept-encoding',
        'accept-language'
      ]);

    const resp = await fetch(fullUrl, {
      method,
      headers: safeHeaders
    }).then(res => res.text());

    res.setHeader('Content-Type', 'application/json');
    res.end(resp);
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, <{ (): void }>((err: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  }));
});
