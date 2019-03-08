import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
// import { ApolloProvider } from 'react-apollo';
import resolvers from './apollo/resolvers';
import App from './App';
import './sass/main.scss';

/* 
    Here we set up our store with ApolloClient. We can initialize a local state store and also connect to an external datasource.
*/
const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,    
    resolvers,
});
// The writeData function allows us to set up a default state for our store.
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
        // This is the ApolloProvider renamed to ApolloHooksProvider as we're using the react-apollo-hooks version of ApolloProvider
        <ApolloHooksProvider client={client}>
            <App />
        </ApolloHooksProvider>        
    , document.getElementById('root')
);

// Make note that we're using ApolloProvider from react-apollo-hooks and that you can use Hook. 




/*

    ** Resources for technologies used **

    - ApolloClient/ Apollo : https://www.apollographql.com/docs/react/
    - React Router : https://reacttraining.com/react-router/web/guides/quick-start
    - Learning GraphQL : https://graphql.org/learn/
    - Practicing Apollo & Graphql: https://www.howtographql.com/

    
*/