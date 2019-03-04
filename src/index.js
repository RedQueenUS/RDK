import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import resolvers from './apollo/resolvers';
import App from './App';
import './sass/main.scss';

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,    
    resolvers,
});
cache.writeData({
    data: {
        counter: {
            __typename: 'Counter',
            count: 0,
            incrementBy: 1
        }
    }
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
            <App />
        </ApolloHooksProvider>        
    </ApolloProvider>
    , document.getElementById('root')
);


