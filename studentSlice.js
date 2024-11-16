
const initialState = {
    students: [],
  };
  
  const studentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_STUDENT':
        return {
          ...state,
          students: [...state.students, action.payload], // Add the new student to the array
        };
      // other cases...
      default:
        return state;
    }
  };
  
  export default studentReducer;
  