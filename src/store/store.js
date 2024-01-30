import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../redux/profileSlice';

export default configureStore({
  reducer: {
    profile: profileReducer,
  },
});