import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your email.');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email) || !email.endsWith('.com')) { 
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
 
    Alert.alert('Password Reset', 'A password reset link has been sent to your email.');
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingLeft: 8, borderRadius: 5 },
  button: { backgroundColor: 'green', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: 'white', fontSize: 16 },
  link: { color: 'green', textAlign: 'center', marginTop: 8 },
});

export default ForgotPasswordScreen;
