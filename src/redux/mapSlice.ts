// mapSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the state type
interface MapState {
  distance: number;
  time: number;
  totalDistance: string;
  totalTime: string;
  minFareAmount: string;
}

// Initial state
const initialState: MapState = {
  distance: 0,
  time: 0,
  totalDistance: '0',
  totalTime: '0',
  minFareAmount: '0',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setTotalDistance: (state, action: PayloadAction<string>) => {
      state.totalDistance = action.payload;
    },
    setTotalTime: (state, action: PayloadAction<string>) => {
      state.totalTime = action.payload;
    },
    setMinFareAmount: (state, action: PayloadAction<string>) => {
      state.minFareAmount = action.payload;
    },
    clearTime: state => {
      state.time = 0;
    },
    clearMapState: state => {
      state.distance = 0;
      state.time = 0;
      state.totalDistance = '0';
      state.totalTime = '0';
      state.minFareAmount = '0';
    },
  },
});

export const {
  setDistance,
  setTime,
  setTotalDistance,
  setTotalTime,
  setMinFareAmount,
  clearMapState,
} = mapSlice.actions;
export default mapSlice.reducer;
