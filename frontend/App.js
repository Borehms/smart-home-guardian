import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import PrimaryUserLoginScreen from "./screens/PrimaryUserLoginScreen";
import UserLoginScreen from "./screens/UserLoginScreen";
import HomeScreen from "./screens/HomeScreen";
import PrimaryUserDashboardScreen from "./screens/PrimaryUserDashboardScreen";
import RequestAccessScreen from "./screens/RequestAccessScreen";
import PendingRequestsScreen from "./screens/PendingRequestsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RemoveUserScreen from "./screens/RemoveUserScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // show banner if not connected or internet unreachable
      setIsOffline(!(state.isConnected && state.isInternetReachable));
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>You are offline</Text>
        </View>
      )}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen
            name="PrimaryUserLogin"
            component={PrimaryUserLoginScreen}
          />
          <Stack.Screen name="UserLogin" component={UserLoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="PrimaryUserDashboard"
            component={PrimaryUserDashboardScreen}
          />
          <Stack.Screen name="RequestAccess" component={RequestAccessScreen} />
          <Stack.Screen
            name="PendingRequests"
            component={PendingRequestsScreen}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="RemoveUserScreen"
            component={RemoveUserScreen}
            options={{ title: "Remove Access" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  offlineBanner: {
    backgroundColor: "#b52424",
    padding: 10,
    alignItems: "center",
  },
  offlineText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
