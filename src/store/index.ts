import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "./reducer/authReducer";
import postReducer from "./reducer/postReducer";
import { persistReducer, persistStore } from "redux-persist"; // Import persistStore
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@/app/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["authState"],
};

const rootReducer = combineReducers<any>({
  auth: persistReducer(authPersistConfig, authReducer),
  post: postReducer,
});

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
