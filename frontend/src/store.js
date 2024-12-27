import { createStore } from "redux";
import userReducer from "./reducers/userReducer";

const persistedState = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : {};

const store = createStore(
  userReducer,
  { userDetails: persistedState }, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);


export default store;
