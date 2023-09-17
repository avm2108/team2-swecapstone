// store.ts

import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

// Import your reducers
import mapReducer from './mapSlice';
import driverReducer from './driverSlice';
import dispatcherReducer from './dispatcherSlice';

// RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Redux hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // key for AsyncStorage
  version: 1,
  storage: AsyncStorage, // AsyncStorage as storage
  whitelist: ['map'], // Reducers to persist (whitelist)
};

// Combine all reducers
const rootReducer = combineReducers({
  map: mapReducer,
  drivers: driverReducer,
  dispatchers: dispatcherReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persisted store
export const persistor = persistStore(store);

// AppDispatch type
export type AppDispatch = typeof store.dispatch;
