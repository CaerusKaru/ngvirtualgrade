const API_ENDPOINT = '/data';
const GRAPHQL_ENDPOINT = API_ENDPOINT + '/graphql';
const GRAPHQL_PROD_WS_ENDPOINT = '/wss';
const GRAPHQL_SUBSCRIPTION = GRAPHQL_PROD_WS_ENDPOINT + '/subscriptions';

export const environment = {
  production: true,
  API_ENDPOINT,
  ENTITY_NAME: 'Tufts University',
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION,
  hmr: false
};
