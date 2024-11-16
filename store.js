
import { createStore } from 'redux';

// Initial state
const initialState = {
  students: []
};

// Action Types
const ADD_STUDENT = 'ADD_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

// Reducer
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload] };
    case EDIT_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        )
      };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((student) => student.id !== action.payload)
      };
    default:
      return state;
  }
};

// Create the store
const store = createStore(studentReducer);

export default store;
