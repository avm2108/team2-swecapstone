// driverSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the state type
interface MapState {
  drivers: string[];
}

// Initial state
const initialState: MapState = {
  drivers: [],
};

const mapSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setDrivers: (state, action: PayloadAction<string[]>) => {
      state.drivers = action.payload;
    },
    clearDrivers: state => {
      state.drivers = [];
    },
  },
});

export const {setDrivers, clearDrivers} = mapSlice.actions;
export default mapSlice.reducer;
