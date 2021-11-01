import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = {
  steps: ['General', 'Contact info', 'Password'],
  currentStep: 0,
  data: { 
    firstName: '',
    middleName: '',
    lastName: '',
    hairColor: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    repeatPassword: ''
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    // Saves data and goes to next step
    goNext: (state, newData) => {
      state.data = {...state.data, ...newData.payload};
      state.currentStep += 1;
    },
    // Goes back one step
    goBack: (state) => {
      state.currentStep -= 1;
      console.log(state);
    },
    // Resets data and goes to 1st slide
    reset: (state) => {
      state.currentStep = 0;
      state.data = initialState.data;
    }
  }
});

export const { goNext, goBack, reset } = formSlice.actions;

export const store = configureStore({
  reducer: formSlice.reducer
});