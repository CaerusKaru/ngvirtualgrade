import { ApolloClient, createNetworkInterface } from 'apollo-client';
import {environment} from '@env/environment';

// Paste your endpoint for the Simple API here.
// Info: https://github.com/graphcool-examples/angular-apollo-instagram-example#2-create-graphql-api-with-graphcool
const networkInterface = createNetworkInterface({
  uri: environment.GRAPHQL_ENDPOINT,
  opts: {
    credentials: environment.production ? 'same-origin' : 'include',
    cache: 'no-cache',
    redirect: 'follow',
  }
});

const client = new ApolloClient({ networkInterface });

export function provideClient(): ApolloClient {
  return client;
}
