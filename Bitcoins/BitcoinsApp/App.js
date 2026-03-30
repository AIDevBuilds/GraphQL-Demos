/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LinkScreen from './screens/LinkScreen';
import CoinDetail from './screens/CoinDetail';
import client from './ApolloClient';
import { ApolloProvider } from '@apollo/client';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen name="Detail" component={CoinDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

function BottomTabNavigator() {
  return (<Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Favorites" component={LinkScreen} />
  </Tab.Navigator>)
}
