import {makeStateKey, TransferState} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from '@env/environment';

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLServerModule {
  cache: InMemoryCache;

  constructor(
    private apollo: Apollo,
    private readonly transferState: TransferState,
    private httpLink: HttpLink
  ) {
    this.cache = new InMemoryCache();

    const isBrowser = this.transferState.hasKey<any>(STATE_KEY);

    this.apollo.create({
      link: httpLink.create({ uri: environment.GRAPHQL_ENDPOINT }),
      cache: this.cache,
    });

    if (!isBrowser) {
      this.onServer();
    }
  }

  private onServer() {
    this.transferState.onSerialize(STATE_KEY, () =>
      this.cache.extract()
    );
  }
}
