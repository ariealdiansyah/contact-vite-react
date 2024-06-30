import { Action, configureStore } from "@reduxjs/toolkit";
import contactSlice from "./Contact/contactSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ThunkAction } from "redux-thunk";

const reducer = combineReducers({
  contact: contactSlice,
});

const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(),
  devTools: true,
});

// export type RootState = ReturnType<typeof reducer>;
// export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
