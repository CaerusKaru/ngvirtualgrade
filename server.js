'use strict';

/* Server specific version of Zone.js */
require('zone.js/dist/zone-node');
require('reflect-metadata');

const express = require('express');
const shrinkRay = require('shrink-ray');
const ngUniversal = require('@nguniversal/express-engine');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main.bundle');

const app = express();
app.use(shrinkRay());

/* Server-side rendering */
function angularRouter(req, res) {
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

app.use(express.static(`${__dirname}/dist`));

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
app.set('view engine', 'html');
app.set('views', 'dist');

/* Direct all routes to index.html, where Angular will take care of routing */
app.get('*', angularRouter);

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`);
});
