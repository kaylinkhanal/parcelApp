'use client'
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


const graphqlProvider = ({children}) => {
  return (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
  )
}

export default graphqlProvider
