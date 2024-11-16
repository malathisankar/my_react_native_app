import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const LoginScreen = ({ navigation }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  // Reset state when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setRollNumber('');
      setPassword('');
    }, [])
  );

  const handleLogin = async () => {
    if (rollNumber.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Please enter both roll number and password.');
      return;
    }

    try {
      const storedStudent = await AsyncStorage.getItem('student');
      if (storedStudent) {
        const student = JSON.parse(storedStudent);

        if (student.rollNumber === rollNumber && student.password === password) {
          Alert.alert('Success', 'Login successful!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'Invalid credentials.');
        }
      } else {
        Alert.alert('Error', 'No student data found.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={rollNumber}
        onChangeText={setRollNumber}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
          <Icon name={secureText ? 'visibility-off' : 'visibility'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingLeft: 8, borderRadius: 5 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderWidth: 1, marginBottom: 12, borderRadius: 5 },
  button: { backgroundColor: 'green', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: 'white', fontSize: 16 },
  link: { color: 'green', textAlign: 'center', marginTop: 8 },
  forgotPassword: { color: 'blue', textAlign: 'center', marginTop: 8, textDecorationLine: 'underline' },
  passwordInput: { height: 40, flex: 1, paddingLeft: 8 },
  eyeIcon: { paddingRight: 10 },
});

export default LoginScreen;
