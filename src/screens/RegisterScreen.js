import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const RegisterScreen = ({ navigation }) => {
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);
  const [classLevel, setClassLevel] = useState('1');

  // Reset state when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setStudentName('');
      setRollNumber('');
      setEmail('');
      setParentName('');
      setPassword('');
      setConfirmPassword('');
      setClassLevel('1'); // Reset class level to default
    }, [])
  );

  const handleRegister = async () => {
    if (
      studentName.trim() === '' ||
      rollNumber.trim() === '' ||
      email.trim() === '' ||
      parentName.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }
    if (studentName.length < 3) {
      Alert.alert('Validation Error', 'Student Name should be at least 3 characters.');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email) || !email.endsWith('.com')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    const student = {
      studentName,
      rollNumber,
      email,
      parentName,
      password,
      classLevel,
    };

    try {
      await AsyncStorage.setItem('student', JSON.stringify(student));
      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Student Name" value={studentName} onChangeText={setStudentName} />
      <TextInput style={styles.input} placeholder="Roll Number" value={rollNumber} onChangeText={setRollNumber} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Parent Name" value={parentName} onChangeText={setParentName} />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
          <MaterialIcons name={secureText ? 'visibility-off' : 'visibility'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={secureConfirmText}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setSecureConfirmText(!secureConfirmText)} style={styles.eyeIcon}>
          <MaterialIcons name={secureConfirmText ? 'visibility-off' : 'visibility'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Class</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={classLevel} onValueChange={setClassLevel} style={styles.picker}>
            <Picker.Item label="B.Sc" value="1" />
            <Picker.Item label="B.Com" value="2" />
            <Picker.Item label="B.A" value="3" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { 
    height: 40, 
    borderColor: '#ccc', // Light border color
    borderWidth: 1, 
    marginBottom: 12, 
    paddingLeft: 8, 
    borderRadius: 5,
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderColor: '#ccc', // Light border color
    borderWidth: 1, 
    marginBottom: 12, 
    borderRadius: 5 
  },
  button: { 
    backgroundColor: 'green', 
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginBottom: 12 
  },
  buttonText: { color: 'white', fontSize: 16 },
  link: { color: 'green', textAlign: 'center', marginTop: 8 },
  passwordInput: { 
    height: 40, 
    flex: 1, 
    paddingLeft: 8 
  },
  eyeIcon: { paddingRight: 10 },
  label: { 
    fontSize: 14, 
    color: 'gray', 
    marginBottom: 5, 
    marginTop: 8 
  },
  pickerContainer: { 
    marginBottom: 12, 
    flexDirection: 'column', 
    width: '100%' 
  },
  pickerWrapper: {
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 5, 
    marginTop: 6,  
  },
  picker: { 
    height: 50,  
    paddingLeft: 8,  
  },
});

export default RegisterScreen;
