import {makeStateKey, TransferState} from '@angular/platform-browser';
import {Inject, NgModule} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from '@env/environment';
import {WebSocketLink} from 'apollo-link-ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {ApolloLink} from 'apollo-link';
import {getOperationAST} from 'graphql';

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLBrowserModule {
  cache: InMemoryCache;

  constructor(
    private apollo: Apollo,
    private readonly transferState: TransferState,
    private httpLink: HttpLink,
    @Inject(DOCUMENT) private document: any
  ) {
    this.cache = new InMemoryCache();

    const isBrowser = this.transferState.hasKey<any>(STATE_KEY);

    this.apollo.create({
      link: this.setupLink(),
      cache: this.cache,
    });

    if (isBrowser) {
      this.onBrowser();
    }
  }

  private setupLink() {

    const http = this.httpLink.create({ uri: environment.GRAPHQL_ENDPOINT });

    let wsUrl = environment.production ? 'wss://' : 'ws://';
    wsUrl += this.document.location.host;
    wsUrl += environment.GRAPHQL_SUBSCRIPTION;

    const websocket = new WebSocketLink(
      new SubscriptionClient(wsUrl, {
        reconnect: true
      })
    );

    const link = ApolloLink.split(
      this.isSubscription,
      /* if true use  */ websocket,
      /* if false use */ http,
    );

    return link;
  }

  private onBrowser() {
    const state = this.transferState.get<any>(STATE_KEY, null);

    this.cache.restore(state);
  }

  private isSubscription(op): boolean {
    const ast = getOperationAST(op.query, op.operationName);
    return ast && ast.operation === 'subscription';
  }
}
