import express from 'express';
import 'module-alias/register';
import { Express } from 'express';
import cors from 'cors';
import path from 'path';
import './load-env';
import { OpenidRequest, OpenidResponse, Session, auth } from 'express-openid-connect';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from '@routes/index';
import cookieParser from 'cookie-parser';
import JwtValidation from '@mw/jwt-validation';
import ActiveSession from '@mw/active-session';

const app: Express = express();
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.AUTH_BASE_URL,
  secret: process.env.AUTH_SECRET,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
};

app.use(auth(config));
app.use(JwtValidation);
app.use(express.static(process.env.CLIENT_BUILD_PATH, {
  setHeaders: function (res, _path) {
    if (_path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, public, max-age=0');
    }
  },
}));
app.use(ActiveSession);
app.use(router);
// The "catchall" handler: for any request that doesn't
// match one handled by express.static above or other routes, 
// send back the index.html file.
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const indexPath = path.resolve(process.env.CLIENT_BUILD_PATH, 'index.html');
  res.sendFile(`${indexPath}`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port} `);
});