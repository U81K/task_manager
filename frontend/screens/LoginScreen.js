import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import { TOKEN_AUTH } from '../graphql/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [tokenAuth] = useMutation(TOKEN_AUTH, {
    onCompleted: async (data) => {
      if (data.tokenAuth.token) {
        await AsyncStorage.setItem('token', data.tokenAuth.token); // Store the token
        setIsLoggedIn(true); // Update the isLoggedIn state in App
        navigation.navigate('Home'); // Redirect to the home page
      }
    },
    onError: (error) => {
      setError(error);
      console.error('Login error:', error);
    },
  });

  const handleLogin = () => {
    tokenAuth({ variables: { username, password } });
  };

  const handleRegister = () => {
	navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;