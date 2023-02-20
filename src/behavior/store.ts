import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './api/login.api';
import { employeesApi } from './api/employees.api';
import sessionReducer from './slices/sessionSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(employeesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
