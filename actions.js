// src/redux/actions.js

export const addStudent = (student) => {
    return {
      type: 'ADD_STUDENT',
      payload: student,
    };
  };
  