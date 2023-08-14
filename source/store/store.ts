import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage or another storage engine
import imagePostsReducer from './imagePostsSlice';

// Configuration for Redux state persistence
const persistConfig = {
  key: 'root',                    // Unique key for persisting the entire state.
  storage: AsyncStorage,          // Storage engine to use.
};

// Created a persisted reducer using the configuration and your reducer
const persistedReducer = persistReducer(persistConfig, imagePostsReducer);

// Configured the Redux store with the persisted reducer
const store = configureStore({
  reducer: {
    imagePosts: persistedReducer, // Used the persisted reducer for the 'imagePosts' slice
  },
});

// Create a persistor to handle state persistence
const persistor = persistStore(store);

// Defined types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Exported the configured Redux store and persistor
export { store, persistor };

// Usage Comment:
// - The 'store' is the Redux store instance, and it can be used to interact with the persisted/Stored state which we done in main screen.
// - The 'persistor' is responsible for managing the persistence of the Redux state across app restarts or reopents.