import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

const dummyDevices = [
  { id: "1", name: "Living Room Light", status: "Active" },
  { id: "2", name: "Thermostat", status: "Inactive" },
  { id: "3", name: "Front Door Camera", status: "Active" },
];

export default function PrimaryUserDashboardScreen({ route, navigation }) {
  const username = route.params?.username || "Primary User";

  const renderDevice = ({ item }) => (
    <View style={styles.deviceCard}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Text style={styles.deviceStatus}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}</Text>
      <View style={styles.dashboard}>
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Controls</Text>
          <Button
            title="Pending Requests"
            onPress={() => navigation.navigate("PendingRequests")}
          />
          <View style={styles.spacer} />
          <Button title="Add Device/User" onPress={() => {}} />
          <View style={styles.spacer} />
          <Button title="Remove Device/User" onPress={() => {}} />
        </View>
        <View style={styles.devicePanel}>
          <Text style={styles.panelTitle}>Connected Devices</Text>
          <FlatList
            data={dummyDevices}
            renderItem={renderDevice}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
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
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  dashboard: { flexDirection: "row", flex: 1 },

  sidebar: {
    flex: 1,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    justifyContent: "flex-start",
  },
  sidebarTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  spacer: { height: 12 },

  devicePanel: { flex: 2, paddingLeft: 12 },
  panelTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },

  deviceCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  deviceName: { fontSize: 16, fontWeight: "bold" },
  deviceStatus: { fontSize: 14, color: "#555" },
});
