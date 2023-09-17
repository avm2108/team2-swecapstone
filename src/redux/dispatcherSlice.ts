// dispatcherSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the state type
interface MapState {
  dispatcher: {};
}

// Initial state
const initialState: MapState = {
  dispatcher: {},
};

const mapSlice = createSlice({
  name: 'dispatcher',
  initialState,
  reducers: {
    setDispatcher: (state, action: PayloadAction<{}>) => {
      state.dispatcher = action.payload;
    },
    clearDispatcher: state => {
      state.dispatcher = {};
    },
  },
});

export const {setDispatcher, clearDispatcher} = mapSlice.actions;
export default mapSlice.reducer;
