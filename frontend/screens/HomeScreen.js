import { GET_TASKS } from '../graphql/queries';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation, setIsLoggedIn }) => {
	const handleLogout = async () => {
	  try {
		await AsyncStorage.removeItem('token'); // Clear the token from AsyncStorage
		setIsLoggedIn(false); // Update the isLoggedIn state in App
		navigation.navigate('Login'); // Navigate back to the LoginScreen
	  } catch (error) {
		console.error('Logout error:', error);
	  }
	};
  
	const { loading, error, data, refetch } = useQuery(GET_TASKS);

	// Use useFocusEffect to refetch tasks when the screen is focused
	useFocusEffect(
		React.useCallback(() => {
		  refetch(); // Refetch tasks when the screen is focused
		}, [refetch])
	  );

	  
	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	return (
	  <View style={styles.container}>
		<FlatList
			data={data.tasks}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => (
			<View style={styles.taskItem} id={item.id}>
				<TouchableOpacity
					style={styles.taskItem}
					onPress={() => navigation.navigate('Task', { taskId: item.id })}>
				<Text style={styles.taskTitle}>{item.title}</Text>
				</TouchableOpacity>
				<Text>{item.description}</Text>
				<Text>Due: {item.dueDate}</Text>
				<Text>Status: {item.completed ? 'Completed' : 'Pending'}</Text>
			</View>
			)}
		/>
		<Button title="Create Task" onPress={() => navigation.navigate('CreateTask' , { refreshTasks: refetch })} />
		<br></br>
		<Button title="Logout" onPress={handleLogout} />
	  </View>
	);
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  padding: 16,
	},
	title: {
	  fontSize: 24,
	  marginBottom: 20,
	},
	taskItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
		taskTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},

  });
  

export default HomeScreen;