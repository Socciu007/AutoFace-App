import { createSlice } from '@reduxjs/toolkit';

export const debugSlice = createSlice({
  name: 'debug',
  initialState: [],
  reducers: {
    setDebug: (state, action) => {
      return [...state, action.payload];
    },
    removeProfile: (state, action) => {
      console.log('state ' + JSON.stringify(state));
      console.log(action);

      const profile = action.payload;
      const newData = state.filter((e) => e.name.toString() !== profile.uid.toString());
      console.log('newData ' + JSON.stringify(newData));
      return newData;
    },
    removeDebug: (state, action) => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDebug, removeDebug, removeProfile } = debugSlice.actions;

export default debugSlice.reducer;
