## Enabling fetch on both the browser and the server

### Adding fetch to the browser

Install `whatwg-fetch` and add it to `polyfills.ts`

### Adding fetch to the server

Install `node-fetch` and import it in `server.ts`. Then set the global
fetch to use this import as follows: 
```typescript
import fetch from 'node-fetch';
global['fetch'] = fetch;
```

### Overriding fetch options on the server

In order to make sure that absolute URLs are used on the server, and
also to add authentication cookies to all requests, you need to install
`fetch-intercept` and follow usage instructions below:

```typescript
import * as fetchIntercept from 'fetch-intercept';

app.get('*', (req, res) => {
  const unregister = fetchIntercept.register({
    request: function (url, config) {
      if (!url.startsWith('http')) {
        url = `${req.protocol}://${req.get('host')}${url}`;
      }
      if (!!req.headers.cookie) {
        config.headers['cookie'] = req.headers.cookie
      }
      return [url, config];
    }
  });
  
  // ... perform op ...
  
  unregister();
})
```
