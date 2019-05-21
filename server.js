"use strict";
exports.__esModule = true;
var port = parseInt(process.env.PORT, 10) || 3000;
console.log(port);
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()
// app.prepare().then(() => {
//   const server = express()
//   server.get('/a', (req, res) => {
//     return app.render(req, res, '/a', req.query)
//   })
// })
