import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/Splash';
import AddTaskScreen from './src/screens/AddTask';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import Signup from './src/screens/Signup';
import TaskDetailScreen from "./src/screens/TaskDetailScreen";
const Stack = createNativeStackNavigator();

function App() {
  const MainNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddTask' component={AddTaskScreen} />
        <Stack.Screen name='TaskDetail' component={TaskDetailScreen} />

      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

export default App;