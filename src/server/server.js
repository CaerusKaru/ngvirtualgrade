'use strict';

/* Server specific version of Zone.js */
require('zone.js/dist/zone-node');
require('reflect-metadata');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');

/* The server bundle is loaded here, it's why you don't want a changing hash in it */
const appServer = require('../../dist-server/main.bundle');

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

const app = express();

/* Root route before static files, or it will serve a static index.html, without pre-rendering */
app.get('/', angularRouter);

app.use(express.static(`${__dirname}/../../dist`));

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: appServer.AppServerModuleNgFactory
}));
app.set('view engine', 'html');
app.set('views', 'dist');

/* Direct all routes to index.html, where Angular will take care of routing */
app.get('*', angularRouter);

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`);
});
