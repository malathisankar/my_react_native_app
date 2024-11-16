import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Import Axios

// Replace this with your actual API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/users'; // Example placeholder API

const StudentDetailsScreen = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from API using Axios
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API_URL); // Axios GET request
        setStudents(response.data); // Assuming the API returns an array of student objects
      } catch (err) {
        setError('Failed to load student data'); // Handle error
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchStudents(); // Call the function to fetch data
  }, []);

  // Render each student item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.studentInfoContainer}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Phone: {item.phone}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading students...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Ensure unique key
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  studentInfoContainer: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default StudentDetailsScreen;
