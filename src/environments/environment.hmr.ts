const API_ENDPOINT = '/data';
const GRAPHQL_ENDPOINT = API_ENDPOINT + '/graphql';
const GRAPHQL_SUBSCRIPTION = API_ENDPOINT + '/subscriptions';

export const environment = {
  production: false,
  API_ENDPOINT,
  ENTITY_NAME: 'Tufts University',
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION,
  hmr: true
};
