// screens/PrimaryUserLoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function PrimaryUserLoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API_BASE = "http://192.168.214.214:5000"; // ← your IP

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        username,
        password,
      });
      // On success, navigate to dashboard with username
      navigation.reset({
        index: 0,
        routes: [{ name: "PrimaryUserDashboard", params: { username } }],
      });
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Login failed";
      Alert.alert("Login Error", msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Primary User Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((v) => !v)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  toggleButton: {
    padding: 10,
    marginLeft: 8,
  },
  toggleText: {
    fontWeight: "600",
    color: "#007AFF",
  },
});
// This screen allows primary users to log in with their credentials.
// It includes a username and password input, with an option to show/hide the password.