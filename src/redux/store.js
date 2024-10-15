// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import notifierReducer from './notifierSlice';

const store = configureStore({
  reducer: {
    notifier: notifierReducer,
  },
});

export default store;