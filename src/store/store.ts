import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import addUserReducer from "./user/addUserSlice";
import usersReducer from "./user/usersSlice";
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["users"], // Persist only auth and user slices
};
const reducer = combineReducers({
  users: usersReducer,
  addUser: addUserReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
