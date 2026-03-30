import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthLoading from '../screens/AuthLoading';
import { Button } from 'react-native';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: 'Now Playing'
                }}
            />
            <Stack.Screen name="Movie" component={MovieDetail} />
        </Stack.Navigator>
    )
};

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AuthLoading"
                component={AuthLoading}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation, route }) => ({
                    headerRight: (props) => (
                        <Button
                            onPress={() => {
                                AsyncStorage.removeItem('token');
                                navigation.replace('Login')
                            }}
                            title="Logout"
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    )
};


const BottomTab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <NavigationContainer>
            <BottomTab.Navigator screenOptions={
                {
                    headerShown: false
                }
            }>
                <BottomTab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        title: 'Now Playing',
                    }}
                />
                <BottomTab.Screen
                    name="Detail"
                    component={ProfileStack}
                    options={{
                        title: 'Welcome',
                    }}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    )
}