import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import TaskScreen from './screens/TaskScreen.js'
import CreateTaskScreen from './screens/CreateTaskScreen';
import RegisterScreen from './screens/RegisterScreen.js'
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	// Check if the user is logged in when the app loads
	useEffect(() => {
	const checkLoginStatus = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
		setIsLoggedIn(true);
		} else {
		setIsLoggedIn(false);
		}
	};

	checkLoginStatus();
	}, []);

	// Show a loading indicator while checking login status
	if (isLoggedIn === null) {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<ActivityIndicator size="large" />
		</View>
	);
	}

	return (
	<ApolloProvider client={client}>
		<NavigationContainer>
		<Stack.Navigator>
			{isLoggedIn ? (
			<Stack.Screen name="Home">
				{(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
			</Stack.Screen>
			) : (
			<Stack.Screen name="Login">
				{(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
			</Stack.Screen>
			)}
			<Stack.Screen name="Task" component={TaskScreen} />
			<Stack.Screen name="CreateTask" component={CreateTaskScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
		</Stack.Navigator>
		</NavigationContainer>
	</ApolloProvider>
	);
}

export default App;