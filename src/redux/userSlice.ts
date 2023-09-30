// userslice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the state type
interface userState {
  user: object;
}

// Initial state
const initialState: userState = {
  user: {},
};

const mapSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    clearUsers: state => {
      state.user = [];
    },
  },
});

export const {setUsers, clearUsers} = mapSlice.actions;
export default mapSlice.reducer;
