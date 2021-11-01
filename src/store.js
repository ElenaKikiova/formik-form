import { createSlice, configureStore } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    steps: ['General', 'Contact info', 'Password'],
    currentStep: 0,
    data: {}
  },
  reducers: {
    goNext: (state, newData) => {
      state.data = {...state.data, ...JSON.parse(newData.payload)};
      console.log(state.data);
      state.currentStep += 1;
    },
    goBack: (state) => {
      state.currentStep -= 1;
    },
    reset: (state) => {
      state.currentStep = 0;
      state.data = {};
    }
  }
});

export const { goNext, goBack, reset } = formSlice.actions;

export const store = configureStore({
  reducer: formSlice.reducer
});