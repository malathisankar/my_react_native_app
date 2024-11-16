import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LogoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
    
      await AsyncStorage.removeItem('userToken');
    
      navigation.navigate('Login');  
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>You have been logged out.</Text>
      
    
      <TouchableOpacity
        style={{
          backgroundColor: '#4CAF50', 
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 8,
        }}
        activeOpacity={0.7}
        onPress={handleLogout}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;
