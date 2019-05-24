import * as next from 'next';
import * as express from 'express';
import { VersionPageQuery } from './models';

const port = parseInt(<string>process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/', (req, res) => app.render(req, res, '/', req.params));

  server.get('/apps/:appSlug', (req, res) => app.render(req, res, '/app', req.params));

  server.get('/apps/:appSlug/versions/:versionId', (req, res) =>
    app.render(req, res, '/version', <VersionPageQuery>req.params)
  );

  server.get('/apps/:appSlug/versions/:versionId/public', (req, res) =>
    app.render(req, res, '/version', <VersionPageQuery>{ ...req.params, isPublic: 'public' })
  );

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, <{ (): void }>((err: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  }));
});
