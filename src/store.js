import { createSlice, configureStore } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    steps: ['General', 'Contact info', 'Password'],
    currentStep: 0,
    data: {}
  },
  reducers: {
    // Saves data and goes to next step
    goNext: (state, newData) => {
      state.data = {...state.data, ...newData.payload};
      state.currentStep += 1;
    },
    // Goes back one step
    goBack: (state) => {
      state.currentStep -= 1;
    },
    // Resets data and goes to 1st slide
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