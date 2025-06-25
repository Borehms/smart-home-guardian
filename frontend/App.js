import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import PrimaryUserLoginScreen from './screens/PrimaryUserLoginScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import HomeScreen from './screens/HomeScreen';
import PrimaryUserDashboardScreen from './screens/PrimaryUserDashboardScreen';
import RequestAccessScreen from './screens/RequestAccessScreen';
import PendingRequestsScreen from './screens/PendingRequestsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="PrimaryUserLogin" component={PrimaryUserLoginScreen} />
        <Stack.Screen name="UserLogin" component={UserLoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PrimaryUserDashboard" component={PrimaryUserDashboardScreen} />
        <Stack.Screen name="RequestAccess" component={RequestAccessScreen} />
        <Stack.Screen name="PendingRequests" component={PendingRequestsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
