import * as next from 'next';
import * as express from 'express';
import { AppVersionPageQuery } from './models';

const port = parseInt(<string>process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/', (req, res) => app.render(req, res, '/', req.params));

  const appPath = '/apps/:appSlug';
  server.get(appPath, (req, res) => app.render(req, res, '/app', req.params));

  const appVersionPath = `${appPath}/versions/:versionId`;

  server.get(`${appVersionPath}/public`, (req, res) =>
    app.render(req, res, '/version', { ...req.params, isPublic: 'public' } as AppVersionPageQuery)
  );

  server.get(`${appVersionPath}/:selectedTab?`, (req, res) =>
    app.render(req, res, '/version', req.params as AppVersionPageQuery)
  );

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, <{ (): void }>((err: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  }));
});
