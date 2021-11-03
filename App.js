import React from 'react';
import {View, StatusBar} from 'react-native';
import TimerScreen from './app/screens/TimerScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator(); 
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Welcome Screen"
                component={WelcomeScreen}
                options={{title:"Welcome Sportskanone"}}
                />
                <Stack.Screen 
                name="Timer"
                component={TimerScreen}
                options={{title:"Timer"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
     
}
  