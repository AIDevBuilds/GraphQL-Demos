import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Movie" component={MovieDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}