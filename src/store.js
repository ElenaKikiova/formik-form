import { createSlice, configureStore } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    steps: ['General', 'Contact information', 'Credentials'],
    currentStep: 0,
  },
  reducers: {
    goNext: state => {
      state.currentStep += 1;
    },
    goBack: state => {
      state.currentStep -= 1;
    },
    reset: state => {
      state.currentStep = 0;
    }
  }
});

export const { goNext, goBack, reset } = formSlice.actions;

export const store = configureStore({
  reducer: formSlice.reducer
});