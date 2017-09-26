import { ApolloClient, createNetworkInterface } from 'apollo-client';
import {environment} from '../environments/environment';

// Paste your endpoint for the Simple API here.
// Info: https://github.com/graphcool-examples/angular-apollo-instagram-example#2-create-graphql-api-with-graphcool
const networkInterface = createNetworkInterface({
  uri: environment.GRAPHQL_ENDPOINT,
  opts: {
    credentials: environment.production ? 'same-origin' : 'include',
  }
});

const client = new ApolloClient({ networkInterface });

export function provideClient(): ApolloClient {
  return client;
}
