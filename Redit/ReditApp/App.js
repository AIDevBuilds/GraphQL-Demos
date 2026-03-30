/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';

export default function App() {

  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
};


