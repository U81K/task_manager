import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      if (data.registerUser.success) {
        Alert.alert('Success', 'Registration successful! Please log in.');
        navigation.navigate('Login'); // Navigate to the Login screen
      } else {
        setErrors(data.registerUser.errors || ['Registration failed.']);
      }
    },
    onError: (error) => {
      setErrors([error.message]);
    },
  });

  const handleRegister = () => {
    if (!username || !password) {
      setErrors(['Please fill in all fields.']);
      return;
    }
	
    registerUser({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {errors.length > 0 && (
        <View style={styles.errorContainer}>
          {errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={loading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorContainer: {
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  loginText: {
    marginTop: 16,
    textAlign: 'center',
  },
  loginLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;