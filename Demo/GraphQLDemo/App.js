/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import Prompt from './Prompt';

export default function App() {

  return (
    <ApolloProvider client={client}>
      <Prompt />
    </ApolloProvider>
  );
};


