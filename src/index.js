import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

// import { ApolloProvider } from 'react-apollo';

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
        <ApolloHooksProvider client={client}>
            <App />
        </ApolloHooksProvider>        
    , document.getElementById('root')
);

// Make note that we're using ApolloProvider from react-apollo-hooks and that you can use Hook. 


