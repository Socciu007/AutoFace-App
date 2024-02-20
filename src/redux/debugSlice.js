import { createSlice } from '@reduxjs/toolkit';

export const debugSlice = createSlice({
  name: 'debug',
  initialState: '',
  reducers: {
    setDebug: (state, action) => {
      return [...state, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDebug } = debugSlice.actions;

export default debugSlice.reducer;
