/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import client from './ApolloClient';
import { ApolloProvider } from '@apollo/client';
import BottomNavigator from './navigation/BottomNavigation';

export default function App() {

  return (
    <ApolloProvider client={client}>
      <BottomNavigator />
    </ApolloProvider>
  );
};


