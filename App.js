import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import store from './store'; // Import the store

import HomeScreen from './src/screens/HomeScreen';
import SchoolLoginScreen from './src/screens/LoginScreen';
import SchoolRegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import StudentListScreen from './src/screens/StudentListScreen';
import StudentDetailsScreen from './src/screens/StudentDetailsScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons
import { Text } from 'react-native'; // Import Text component

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: true, // Show the header with the hamburger icon
            drawerActiveBackgroundColor: '#ddd',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#000',
            drawerType: 'front', // Ensure the drawer comes from the left side
            headerStyle: {
              backgroundColor: '#f5f5f5', // Optional, style the header
            },
            headerTintColor: '#000', // Set the header text color
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerLabel: () => <Text>Home</Text>,
              drawerIcon: ({ color }) => (
                <Icon name="home-outline" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Login"
            component={SchoolLoginScreen}
            options={{
              drawerLabel: () => <Text>Login</Text>,
              drawerIcon: ({ color }) => (
                <Icon name="log-in-outline" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Register"
            component={SchoolRegisterScreen}
            options={{
              drawerLabel: () => <Text>Register</Text>,
              drawerIcon: ({ color }) => (
                <Icon name="person-add-outline" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Forgot Password"
            component={ForgotPasswordScreen}
            options={{
              drawerLabel: () => <Text>Forgot Password</Text>,
              drawerIcon: ({ color }) => (
                <Icon name="key-outline" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Student List"
            component={StudentListScreen}
            options={{
              drawerLabel: () => <Text>Student List</Text>,
              drawerIcon: ({ color }) => (
                <Icon name="list-outline" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Student Details"
            component={StudentDetailsScreen}
            options={{
              drawerLabel: () => <Text>Student Details</Text>,
              drawerIcon: ({ color }) => (
                <Icon name="person-circle-outline" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
  name="Logout"
  component={LogoutScreen}
  options={{
    drawerLabel: () => <Text>Logout</Text>,
    drawerIcon: ({ color }) => (
      <Icon name="log-out-outline" size={24} color={color} />
    ),
  }}
/>

</Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
