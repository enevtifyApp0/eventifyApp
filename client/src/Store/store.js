import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import bookReducer from "../Features/BookSlice";
import eventReducer from "../Features/EventSlice";
import manageUserReducer from "../Features/ManageUserSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { combineReducers } from "redux";
import { reset as resetManageUser } from "../Features/ManageUserSlice";

const persistConfig = {
  key: "reduxstore",
  storage,
};

const rootReducer = combineReducers({
  users: usersReducer,
  books: bookReducer,
  events: eventReducer,
  manageUsers: manageUserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});

const persistore = persistStore(store); // Create persistore for rehydration (npm install redux-persist)

const resetStore = () => {
  store.dispatch(resetManageUser());
};

export { store, persistore, resetStore };
