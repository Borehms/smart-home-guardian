// screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  // New state for strength feedback
  const [strength, setStrength] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const API_BASE = "http://192.168.214.214:5000"; // ← replace with your IP

  // Password strength evaluator
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

  // Handle password input change
  const handlePasswordChange = (text) => {
    setPassword(text);
    evaluatePasswordStrength(text);
  };

  const handleSubmit = async () => {
    try {
      if (role === "primary") {
        await axios.post(`${API_BASE}/api/auth/register`, {
          username,
          password,
          role,
        });
        Alert.alert("Success", "Primary user created. Please log in.");
        navigation.navigate("PrimaryUserLogin");
      } else {
        await axios.post(`${API_BASE}/api/requests`, {
          fullName,
          username,
          password,
          deviceName,
          macAddress,
        });
        Alert.alert(
          "Request Submitted",
          "Your access request has been sent. Please wait for approval."
        );
        navigation.navigate("Welcome");
      }
    } catch (err) {
      console.log("Register error:", err.response?.data || err.message);
      const data = err.response?.data || {};
      const msg =
        data.error || data.message || err.message || "Operation failed";
      Alert.alert("Error", msg);
    }
  };

  // Disable button unless password is strong
  const isSubmitDisabled = password.length === 0 || strength !== "Strong";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {role === "primary" ? "Create Primary User" : "Request Access"}
      </Text>

      {role === "user" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
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
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password input with show/hide and strength */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
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

      {password.length > 0 && (
        <View style={styles.feedback}>
          <Text style={{ fontWeight: "bold" }}>Strength: {strength}</Text>
          {suggestion !== "" && (
            <Text style={{ color: "#555" }}>Tips: {suggestion}</Text>
          )}
        </View>
      )}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          style={styles.picker}
        >
          <Picker.Item label="Regular User" value="user" />
          <Picker.Item label="Primary User" value="primary" />
        </Picker>
      </View>

      <Button
        title={
          role === "primary"
            ? "Create Primary Account"
            : "Submit Access Request"
        }
        onPress={handleSubmit}
        disabled={isSubmitDisabled}
      />
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 20,
  },
  picker: { height: 50 },
});
// This code defines a RegisterScreen component for a React Native app.
// It allows users to register as either a regular user or a primary user.
