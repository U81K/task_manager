import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from './screens/TaskListScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tasks' }} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} options={{ title: 'Create Task' }} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;