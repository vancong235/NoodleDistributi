import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  c1: 0,
  c2: 0,
  c3: 0
};

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    changeCups1: (state) => {
        state.c1 = 1
    },
    changeCups2: (state) => {
        state.c2 = 1
    },
    changeCups3: (state) => {
        state.c3 = 1
    }
  },
});

export const { changeCups1, changeCups2, changeCups3 } = machineSlice.actions;

export const machineReducer = machineSlice.reducer;