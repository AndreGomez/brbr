import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//reducers
import authReducer from './src/reducers/auth';
import userReducer from './src/reducers/user';

//persist config
const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: []
}
const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: [],
}
const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: [],
}

//combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: persistReducer(userPersistConfig, userReducer)
});

// create store and persist reducers
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };