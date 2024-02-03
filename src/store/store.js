import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../redux/profileSlice';
import scriptAutoReducer from '../redux/scriptAutoSlice';
export default configureStore({
  reducer: {
    profile: profileReducer,
    scriptAuto: scriptAutoReducer,
  },
});
