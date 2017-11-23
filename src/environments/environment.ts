// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const API_ENDPOINT = '/data';
const GRAPHQL_ENDPOINT = API_ENDPOINT + '/graphql';
const GRAPHQL_SUBSCRIPTION = API_ENDPOINT + '/subscriptions';

export const environment = {
  production: false,
  API_ENDPOINT,
  ENTITY_NAME: 'Tufts University',
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION,
  hmr: false,
};
