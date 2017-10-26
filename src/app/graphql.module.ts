import {makeStateKey, TransferState} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkHandler, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache, NormalizedCache} from 'apollo-cache-inmemory';
import {environment} from '@env/environment';

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  cache: InMemoryCache;
  link: HttpLinkHandler;

  constructor(
    private apollo: Apollo,
    private readonly transferState: TransferState,
    private httpLink: HttpLink
  ) {
    this.cache = new InMemoryCache();
    this.link = this.httpLink.create({ uri: environment.GRAPHQL_ENDPOINT });

    this.apollo.create({
      link: this.link,
      cache: this.cache,
    });

    const isBrowser = this.transferState.hasKey<NormalizedCache>(STATE_KEY);

    if (isBrowser) {
      this.onBrowser();
    } else {
      this.onServer();
    }
  }

  onServer() {
    this.transferState.onSerialize(STATE_KEY, () =>
      this.cache.extract()
    );
  }

  onBrowser() {
    const state = this.transferState.get<NormalizedCache>(STATE_KEY, null);

    this.cache.restore(state);
  }
}
