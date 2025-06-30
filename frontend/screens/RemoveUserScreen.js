import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function RemoveUserScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://192.168.214.214:5000/api/auth/users');
        setUsers(res.data);
      } catch (err) {
        Alert.alert('Error', 'Could not fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://192.168.214.214:5000/api/auth/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      Alert.alert('Access Removed', 'User access has been removed');
    } catch (err) {
      Alert.alert('Error', 'Failed to remove access');
    }
  };

  const renderUser = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.fullName} ({item.username})</Text>
      <Button title="Remove Access" color="red" onPress={() => handleRemove(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remove User Access</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        ListEmptyComponent={<Text>No users found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
  },
  username: { fontWeight: '600', marginBottom: 6 },
});
// This screen allows the admin to view all registered users and revoke their access.
// It fetches the user list from the backend and displays each user with a button to revoke access.
// When the button is pressed, it sends a delete request to the backend to remove the user.
// After successful deletion, it updates the local state to reflect the changes.    