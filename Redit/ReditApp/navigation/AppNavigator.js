import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Posts from '../screens/Posts';
import PostDetail from '../screens/PostDetail';
import PostForm from '../screens/PostForm';
import { Button } from 'react-native'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Posts" component={Posts}
                    options={({ navigation, route }) => ({
                        headerRight: (props) => (
                            <Button
                                onPress={() => navigation.navigate("PostForm", {})}
                                title="Add"
                            />
                        ),
                    })} />
                <Stack.Screen name="Detail" component={PostDetail} />
                <Stack.Screen name="PostForm" component={PostForm} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}