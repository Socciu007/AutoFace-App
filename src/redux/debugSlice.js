import { createSlice } from '@reduxjs/toolkit';

export const debugSlice = createSlice({
  name: 'debug',
  initialState: [{ name: 'Duy Kiên', script: 'NewFeeds', err: 'Log lỗi' }],
  reducers: {
    setDebug: (state, action) => {
      return [...state, action.payload];
    },
    removeDebug: (state, action) => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDebug, removeDebug } = debugSlice.actions;

export default debugSlice.reducer;
