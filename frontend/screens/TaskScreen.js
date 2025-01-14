import React from 'react';
import { Alert, View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_TASK } from '../graphql/queries';
import {DELETE_TASK} from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const TaskScreen = ({ route, navigation}) => {
	const { taskId } = route.params; // Get the taskId from navigation parameters
	const {loading, error, data } = useQuery(GET_TASK, {
		variables: { id: taskId },
	  });


		const [deleteTask ] = useMutation(DELETE_TASK, {
			variables: { id: taskId },
			onCompleted: () => {
				navigation.navigate('Home');
		},
		onError: (error) => {
			Alert.alert('Error', error.message);
		},
	});
	if (loading) {
		return (
		  <View style={styles.loadingContainer}>
			<ActivityIndicator size="large" color="#0000ff" />
		  </View>
		);
	  }
	  if (error) {
		return (
		  <View style={styles.container}>
			<Text>Error: {error.message}</Text>
		  </View>
		);
	}
	const task = data?.task;
	return (
    <View style={styles.container}>
		<Text style={styles.title}>{task.title}</Text>
		<Text style={styles.description}>{task.description}</Text>
		<Text style={styles.dueDate}>Due: {task.dueDate}</Text>
		<Text style={styles.status}>Status: {task.completed ? 'Completed' : 'Pending'}</Text>
		<Button
			title="Delete Task"
			onPress={deleteTask}
			color="red"
		/>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
	flex: 1,
	padding: 16,
	justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
	fontSize: 24,
	fontWeight: 'bold',
	marginBottom: 16,
	},
	description: {
	fontSize: 16,
	marginBottom: 8,
	},
	dueDate: {
	fontSize: 14,
	color: '#666',
	},
});

export default TaskScreen;