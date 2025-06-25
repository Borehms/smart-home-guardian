import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";


export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Guardian</Text>
      <Button
        title="Login as Primary User"
        onPress={() => navigation.navigate("PrimaryUserLogin")}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Login as Regular User"
        onPress={() => navigation.navigate("UserLogin")}
      />
      <View style={{ height: 20 }} />
      {/* Removed the stray +{" "} here */}
      <Button
        title="Register New Account"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
