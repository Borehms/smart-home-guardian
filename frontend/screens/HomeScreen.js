import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen({ route }) {
  const username = route.params?.username || "User";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}</Text>
      <Text style={styles.text}>
        Here you can control your smart home devices.
      </Text>
      <Button
        title="Logout"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, color: "#555" },
});
