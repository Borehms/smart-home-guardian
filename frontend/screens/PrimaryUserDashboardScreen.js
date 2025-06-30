import React, { useState, useCallback } from "react"; // ← add useCallback
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native"; // ← keep this

export default function PrimaryUserDashboardScreen({ route, navigation }) {
  const username = route.params?.username || "Primary User";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://192.168.214.214:5000/api/auth/users");
      // console.log("Frontend fetched users:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.log("Fetch users error:", err);
      Alert.alert("Error", "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Re‑fetch on focus and poll every 5s
  useFocusEffect(
    useCallback(() => {
      // Immediately load fresh data
      fetchUsers();

      // Then poll every 5 seconds
      const intervalId = setInterval(fetchUsers, 5000);

      // Cleanup when screen loses focus
      return () => clearInterval(intervalId);
    }, [])
  );

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.fullName || item.username}</Text>
      <Text style={styles.userUsername}>({item.username})</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}</Text>
      <View style={styles.dashboard}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Controls</Text>
          <Button
            title="Pending Requests"
            onPress={() => navigation.navigate("PendingRequests")}
          />
          <View style={styles.spacer} />
          <Button
            title="Remove Access"
            onPress={() => navigation.navigate("RemoveUserScreen")}
          />
        </View>

        {/* Approved Users Panel */}
        <View style={styles.userPanel}>
          <Text style={styles.panelTitle}>Approved Users</Text>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : users.length === 0 ? (
            <Text style={styles.noUsers}>No users have been approved yet</Text>
          ) : (
            <FlatList
              data={users}
              renderItem={renderUser}
              keyExtractor={(item) => item.id}
            />
          )}
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
  },
  sidebarTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  spacer: { height: 12 },

  userPanel: { flex: 2, paddingLeft: 12 },
  panelTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  noUsers: { fontStyle: "italic", color: "#777" },

  userCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    alignItems: "center",
  },
  userName: { fontSize: 16, fontWeight: "bold", marginRight: 6 },
  userUsername: { fontSize: 14, color: "#555" },
});
