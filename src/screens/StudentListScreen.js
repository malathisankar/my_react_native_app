import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentListScreen = () => {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentAge, setNewStudentAge] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    // Load students from AsyncStorage on component mount
    const loadStudents = async () => {
      const storedStudents = await AsyncStorage.getItem('students');
      if (storedStudents) {
        setStudents(JSON.parse(storedStudents));
      }
    };
    loadStudents();
  }, []);

  // Save students to AsyncStorage
  const saveStudentsToStorage = async (students) => {
    await AsyncStorage.setItem('students', JSON.stringify(students));
  };

  // Add new student
  const addStudent = async () => {
    if (newStudentName.trim() && newStudentAge.trim() && newStudentGrade.trim()) {
      const newStudent = {
        id: String(students.length + 1), // Generate a unique id
        name: newStudentName,
        age: newStudentAge,
        grade: newStudentGrade,
      };
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      setNewStudentName('');
      setNewStudentAge('');
      setNewStudentGrade('');
      await saveStudentsToStorage(updatedStudents);
    }
  };

  // Edit student
  const editStudent = async (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setEditingStudent(studentToEdit);
    setNewStudentName(studentToEdit.name);
    setNewStudentAge(studentToEdit.age);
    setNewStudentGrade(studentToEdit.grade);
  };

  const saveEditedStudent = async () => {
    if (newStudentName.trim() && newStudentAge.trim() && newStudentGrade.trim()) {
      const updatedStudents = students.map((student) =>
        student.id === editingStudent.id
          ? { ...student, name: newStudentName, age: newStudentAge, grade: newStudentGrade }
          : student
      );
      setStudents(updatedStudents);
      setNewStudentName('');
      setNewStudentAge('');
      setNewStudentGrade('');
      setEditingStudent(null);
      await saveStudentsToStorage(updatedStudents);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    await saveStudentsToStorage(updatedStudents);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.studentInfoContainer}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text>Age: {item.age}</Text>
        <Text>Grade: {item.grade}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.detailsButton} onPress={() => editStudent(item.id)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteStudent(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newStudentName}
          onChangeText={setNewStudentName}
          placeholder="Enter student name"
        />
        <TextInput
          style={styles.input}
          value={newStudentAge}
          onChangeText={setNewStudentAge}
          placeholder="Enter student age"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={newStudentGrade}
          onChangeText={setNewStudentGrade}
          placeholder="Enter student grade"
        />
        {editingStudent ? (
          <TouchableOpacity style={styles.saveButton} onPress={saveEditedStudent}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={addStudent}>
            <Text style={styles.buttonText}>Add Student</Text>
          </TouchableOpacity>
        )}
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentInfoContainer: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  detailsButton: {
    marginBottom: 5,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 20,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default StudentListScreen;
