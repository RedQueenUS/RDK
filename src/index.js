import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';


import defaultState from './apollo/defaultState';
import resolvers from './apollo/resolvers';
import App from './App';
import './sass/main.scss';

const cache = new InMemoryCache();

const stateLink = withClientState({
    cache,
    defaults: defaultState,
    resolvers,
});

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
        stateLink
    ])
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root')
);


