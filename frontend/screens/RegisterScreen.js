import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../utils/api";

export default function RegisterScreen({ navigation }) {
  //   const [fullName, setFullName] = useState(""); // optional
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [role, setRole] = useState("user"); // default to standard user

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

  const handlePasswordChange = (text) => {
    setPassword(text);
    evaluatePasswordStrength(text);
  };

  const handleRegister = async () => {
    // basic validation
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Username and password are required.");
      return;
    }
    if (strength !== "Strong") {
      Alert.alert(
        "Error",
        "Please choose a stronger password before registering."
      );
      return;
    }

    try {
      await api.post("/auth/register", { username, password, role });
      Alert.alert("Success", "Registration complete. Please log in.");
      navigation.navigate(
        role === "primary" ? "PrimaryUserLogin" : "UserLogin"
      );
    } catch (err) {
      Alert.alert(
        "Registration Failed",
        err.response?.data?.error || err.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register New Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
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
          {suggestion ? (
            <Text style={{ color: "#555" }}>Tips: {suggestion}</Text>
          ) : null}
        </View>
      )}

      <Text style={styles.label}>Role</Text>
      <Picker
        selectedValue={role}
        onValueChange={setRole}
        style={styles.picker}
      >
        <Picker.Item label="Regular User" value="user" />
        <Picker.Item label="Primary User" value="primary" />
      </Picker>

      <View style={styles.spacer} />
      <Button
        title="Register"
        onPress={handleRegister}
        disabled={strength !== "Strong"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  label: { marginTop: 10, marginBottom: 4, fontWeight: "600" },
  picker: { height: 50, marginBottom: 12 },
  spacer: { height: 20 },
});
