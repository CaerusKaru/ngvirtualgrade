'use strict';

/* Server specific version of Zone.js */
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

const {CookieJar} = require('tough-cookie');
import * as cookieParser from 'cookie-parser';
const cookieJar = new CookieJar();
global['fetch'] = require('fetch-cookie')(require('node-fetch'), cookieJar);

import * as express from 'express';
import * as helmet from 'helmet';
import * as expressProxy from 'express-http-proxy';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { join } from 'path';

const DIST_FOLDER = join(process.cwd(), 'dist');
const PORT = process.env.FRONTEND_PORT || 3000;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

const app = express();

app.use(cookieParser());
app.use('/data', expressProxy('localhost:4000'));

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['\'none\''],
    styleSrc: ['\'self\'', 'fonts.googleapis.com', '\'unsafe-inline\''],
    workerSrc: ['\'self\''],
    scriptSrc: ['\'self\'', '\'unsafe-eval\''],
    connectSrc: ['\'self\'', 'fonts.gstatic.com', 'fonts.googleapis.com'],
    imgSrc: ['\'self\'', 'data:'],
    manifestSrc: ['\'self\''],
    fontSrc: ['\'self\'', 'fonts.gstatic.com']
  }
}));

app.use(helmet.frameguard({ action: 'deny' }));

const sixtyDaysInSeconds = 5184000;
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}));


/* Server-side rendering */
function angularRouter(req, res) {

  if (!!req.cookies) {
    for (const c of Object.keys(req.cookies)) {
      cookieJar.setCookie(c + '=' + req.cookies[c], `${req.protocol}://${req.get('host')}`, {}, () => {});
    }
  }
  /* Server-side rendering */
  res.render('index', {
    req,
    res,
    providers: [{
      provide: 'serverUrl',
      useValue: `${req.protocol}://${req.get('host')}`
    }]
  });
}

/* Root route before static files, or it will serve a static index.html, without pre-rendering */
app.get('/', angularRouter);

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// ALl regular routes use the Universal engine
app.get('*', angularRouter);

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
