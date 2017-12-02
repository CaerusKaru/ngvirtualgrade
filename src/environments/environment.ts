// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {API_ENDPOINT, ENTITY_NAME, GRAPHQL_ENDPOINT, GRAPHQL_SUBSCRIPTION} from '@env/common';

export const environment = {
  production: false,
  API_ENDPOINT,
  ENTITY_NAME,
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION,
  hmr: false,
};
