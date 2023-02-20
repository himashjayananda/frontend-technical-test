import { createSlice } from '@reduxjs/toolkit';
import { SessionType } from '../../types/Session';
import { UserType } from '../../types/User';

const initialState: SessionType = {
  isAuthenticated: false,
  id: '',
  name: '',
  email: '',
  role: '',
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionData: (state, { payload }: { payload: UserType }) => {
      state.isAuthenticated = true;
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.role = payload.role;
    },
    resetSessionData: state => {
      state.isAuthenticated = false;
      state.id = '';
      state.name = '';
      state.email = '';
      state.role = '';
    },
  },
});

export const { setSessionData, resetSessionData } = sessionSlice.actions;

export default sessionSlice.reducer;
