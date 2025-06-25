import api from "../utils/api";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function RequestAccessScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [macAddress, setMacAddress] = useState("");

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
    else if (score === 3 || score === 4) setStrength("Medium");
    else setStrength("Strong");

    setSuggestion(score === 5 ? "" : tips.join(", "));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    evaluatePasswordStrength(text);
  };

  const handleSubmit = async () => {
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />

      {password.length > 0 && (
        <View style={styles.feedback}>
          <Text style={{ fontWeight: "bold" }}>Strength: {strength}</Text>
          {suggestion !== "" && (
            <Text style={{ color: "#555" }}>Tips: {suggestion}</Text>
          )}
        </View>
      )}

      <Button title="Submit Request" onPress={handleSubmit} />
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
  feedback: {
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 6,
  },
});
