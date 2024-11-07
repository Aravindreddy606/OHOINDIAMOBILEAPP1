import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './assets/screens/HomeScreen';
import DetailsScreen from './assets/screens/DetailsScreen';
import AddMember from './assets/screens/AddMember';
import UpdateScreen from './assets/screens/UpdateScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="VEHICLE INSURANCE" component={HomeScreen} />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
                <Stack.Screen name="AddMember" component={AddMember} />
                <Stack.Screen name="UpdateScreen" component={UpdateScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}