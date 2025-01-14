import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../graphql/mutations'; // Import the mutation

const CreateTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      // Navigate back to the home screen after successful creation
      navigation.navigate('Home');
    },
    onError: (error) => {
      Alert.alert('Error', error.message); // Show error message
    },
  });

  const handleCreateTask = () => {
    if (!title || !description || !dueDate) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    createTask({
      variables: {
        title,
        description,
        dueDate,
      	completed,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}/>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Due Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter due date (e.g., 2023-10-31)"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <Button
        title={'Create Task'}
        onPress={handleCreateTask}
        disabled={loading}
      />

      {error && <Text style={styles.error}>Error: {error.message}</Text>} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});

export default CreateTaskScreen;