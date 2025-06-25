import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../utils/api';

export default function UserLoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const resp = await api.post('/auth/login', { username, password });
      if (resp.data.success) {
        navigation.navigate('Home', { username });
      }
    } catch (err) {
      Alert.alert('Login Failed', err.response?.data?.message || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />

      {/* New button for access requests */}
      <View style={styles.spacer} />
      <Button
        title="Request Network Access"
        onPress={() => navigation.navigate('RequestAccess')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  spacer: {
    height: 20,
  },
});
// This code defines a UserLoginScreen component for a React Native application.
// It allows users to log in with a username and password, and handles login requests to a backend API.
// If the login is successful, it navigates to a Home screen with the username as a parameter.
// If the login fails, it shows an alert with the error message.    