import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,    // ← added
} from "react-native";
import api from "../utils/api";

export default function RequestAccessScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ← added

  // Evaluate password strength
  const evaluatePasswordStrength = (pwd) => {
    let score = 0;
    let tips = [];

    if (pwd.length >= 8) score++;
    else tips.push("Use at least 8 characters");

    if (/[A-Z]/.test(pwd)) score++;
    else tips.push("Include an uppercase letter");

    if (/[a-z]/.test(pwd)) score++;
    else tips.push("Include a lowercase letter");

    if (/\d/.test(pwd)) score++;
    else tips.push("Include a number");

    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    else tips.push("Include a special character");

    if (score <= 2) setStrength("Weak");
    else if (score < 5) setStrength("Medium");
    else setStrength("Strong");

    setSuggestion(score === 5 ? "" : tips.join(", "));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    evaluatePasswordStrength(text);
  };

  const handleSubmit = async () => {
    // Prevent empty submissions
    if (
      !fullName.trim() ||
      !username.trim() ||
      !deviceName.trim() ||
      !macAddress.trim() ||
      !password.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }

    // Enforce strong password
    if (strength !== "Strong") {
      Alert.alert(
        "Weak Password",
        "Please choose a stronger password before submitting."
      );
      return;
    }

    try {
      await api.post("/requests", {
        fullName,
        username,
        deviceName,
        macAddress,
        password,
      });
      Alert.alert("Submitted", "Your access request has been sent.");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Request Access to Network</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Device Name"
        value={deviceName}
        onChangeText={setDeviceName}
      />
      <TextInput
        style={styles.input}
        placeholder="Device MAC Address"
        value={macAddress}
        onChangeText={setMacAddress}
      />

      {/* Password input with show/hide toggle */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {password.length > 0 && (
        <View style={styles.feedback}>
          <Text style={{ fontWeight: "bold" }}>Strength: {strength}</Text>
          {suggestion !== "" && (
            <Text style={{ color: "#555" }}>Tips: {suggestion}</Text>
          )}
        </View>
      )}

      <Button
        title="Submit Request"
        onPress={handleSubmit}
        disabled={strength !== "Strong"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  toggleButton: {
    padding: 10,
    marginLeft: 8,
  },
  toggleText: {
    fontWeight: "600",
    color: "#007AFF",
  },
  feedback: {
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 6,
  },
});
