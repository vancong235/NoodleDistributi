import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import userReducer from '../features/user/userSlice';
import { machineReducer } from '../features/machine/machineSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    machine: machineReducer
  },
  middleware: [thunkMiddleware],
});

export default store;