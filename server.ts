'use strict';

/* Server specific version of Zone.js */
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as helmet from 'helmet';
import * as expressProxy from 'express-http-proxy';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { join } from 'path';

import * as xhr2 from 'xhr2';
import {PREBOOT_NONCE} from 'preboot/src';
import {v4} from 'uuid';

xhr2.prototype._restrictedHeaders = {};

const DIST_FOLDER = join(process.cwd(), 'dist');
const PORT = process.env.FRONTEND_PORT || 3000;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

const app = express();

const devServerHost = 'localhost';
const devServerPort = 4000;
const devServer = `${devServerHost}:${devServerPort}`;

app.use('/data', expressProxy(devServer));

app.use((req, res, next) => {
  res.locals.nonce = v4();
  next();
});

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['\'none\''],
    styleSrc: ['\'self\'', 'fonts.googleapis.com', '\'unsafe-inline\''],
    workerSrc: ['\'self\''],
    scriptSrc: ['\'self\'', '\'unsafe-eval\'', (req, res) => `'nonce-${ res.locals.nonce }'`],
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

  /* Server-side rendering */
  res.render('index', {
    req,
    res,
    providers: [
      {
        provide: PREBOOT_NONCE,
        useValue: res.locals.nonce
      }
    ]
  }, function (error, html) {
    if (error) {
      console.error('rendering error', error);
    }
    console.log(html.substring(0, 100));
    console.log(res.locals.nonce);
    res.send(html);
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
