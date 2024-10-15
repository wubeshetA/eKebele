
import { createSlice } from '@reduxjs/toolkit';

const notifierSlice = createSlice({
  name: 'notifier',
  initialState: {
    showNotifier: true,
  },
  reducers: {
    setShowNotifier(state, action) {
      state.showNotifier = action.payload;
    },
  },
});

export const { setShowNotifier } = notifierSlice.actions;
export default notifierSlice.reducer;