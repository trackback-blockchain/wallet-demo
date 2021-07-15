import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../reducers/app';
import userReducer from '../reducers/user';

export function makeStore() {
  return configureStore({
    reducer: {
      app: appReducer,
      user: userReducer
    },

  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
