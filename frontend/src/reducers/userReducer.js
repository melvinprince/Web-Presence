// src/reducers/userReducer.js

const initialState = {
  userDetails: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload, // Update the userDetails state
      };
    case "CLEAR_USER_DETAILS":
      return {
        ...state,
        userDetails: null, // Clear the userDetails state
      };
    default:
      return state; // Return current state if no action matches
  }
};

export default userReducer;
