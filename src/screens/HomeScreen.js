import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/ps_college.jpg')} style={styles.logo} />

      <Text style={styles.header}>Welcome to PS College</Text>
      <Text style={styles.subHeader}>Manage student details effectively</Text>
      
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={navigateToLogin}
      >
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={navigateToRegister}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 50,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  skipButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    color: 'green',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
