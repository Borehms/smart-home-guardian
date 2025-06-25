import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import api from "../utils/api";

export default function PendingRequestsScreen() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const resp = await api.get("/requests");
      setRequests(resp.data);
      const pending = resp.data.filter((r) => r.status === "pending");
      setRequests(pending);
    } catch {
      Alert.alert("Error", "Failed to load requests");
    }
  };

  const decide = async (id, action) => {
    try {
      await api.patch(`/requests/${id}/${action}`);
      Alert.alert("Success", `Request ${action}d.`);
      loadRequests();
    } catch {
      Alert.alert("Error", `Failed to ${action} request`);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>
              {item.fullName} – {item.deviceName}
            </Text>
            <View style={styles.buttons}>
              <Button
                title="Approve"
                onPress={() => decide(item.id, "approve")}
              />
              <Button
                title="Decline"
                color="red"
                onPress={() => decide(item.id, "decline")}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No pending requests</Text>
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
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
});
