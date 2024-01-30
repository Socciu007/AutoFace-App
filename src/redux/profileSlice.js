import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: [],
  reducers: {
    updateProfiles: (state, action) => {
      // action.payload is an array of profiles to be updated
      return action.payload;
    },
    updateProfile: (state, action) => {
      const index = state.findIndex((e) => e.id == action.payload.id);
      const newState = [...state];
      if (index >= 0) newState[index] = action.payload;
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfiles, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;